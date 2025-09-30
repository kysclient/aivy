import { PaginatedResponse } from '@/repositoires/base/IBaseRepository';
import {
  CreateMealPlanDto,
  MealPlan,
  MealPlanRepository,
  MealPlanStatus,
} from '@/repositoires/MealPlanRepository';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

const mealPlanRepository = new MealPlanRepository();

// SWR 키 생성 함수들
const MEAL_PLAN_KEYS = {
  byId: (id: string) => ['meal-plan', id],
  userMealPlans: (page?: number, limit?: number) => ['meal-plans', 'user', { page, limit }],
  byStatus: (status: MealPlanStatus) => ['meal-plans', 'status', status],
} as const;

// Fetcher 함수들
const fetchers = {
  getMealPlanById: async ([, id]: [string, string]) => {
    return await mealPlanRepository.getMealPlanById(id);
  },
  getUserMealPlans: async ([, , params]: [string, string, { page?: number; limit?: number }]) => {
    return await mealPlanRepository.getUserMealPlans(params.page, params.limit);
  },
  getMealPlansByStatus: async ([, , status]: [string, string, MealPlanStatus]) => {
    return await mealPlanRepository.getMealPlansByStatus(status);
  },
};

const mutators = {
  deleteMealPlan: async (url: string, { arg }: { arg: string }) => {
    await mealPlanRepository.deleteMealPlan(arg);
  },
  updateMealPlan: async (
    url: string,
    { arg }: { arg: { id: string; data: Partial<CreateMealPlanDto> } }
  ) => {
    return await mealPlanRepository.updateMealPlan(arg.id, arg.data);
  },
};

// 개별 식단 조회 훅
export function useMealPlan(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? MEAL_PLAN_KEYS.byId(id) : null,
    fetchers.getMealPlanById,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30초 동안 중복 요청 방지
    }
  );

  return {
    mealPlan: data,
    isLoading,
    error,
    refresh: mutate,
  };
}

// 사용자 식단 목록 조회 훅
export function useUserMealPlans(page?: number, limit?: number) {
  const { data, error, isLoading, mutate } = useSWR(
    MEAL_PLAN_KEYS.userMealPlans(page, limit),
    fetchers.getUserMealPlans,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // 10초 동안 중복 요청 방지
    }
  );

  return {
    mealPlans: data?.mealPlans || [],
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 0,
    isLoading,
    error,
    refresh: mutate,
  };
}

// 상태별 식단 조회 훅
export function useMealPlansByStatus(status: MealPlanStatus) {
  const { data, error, isLoading, mutate } = useSWR<any>(
    MEAL_PLAN_KEYS.byStatus(status),
    fetchers.getMealPlansByStatus,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 15000, // 15초 동안 중복 요청 방지
      refreshInterval: status === MealPlanStatus.GENERATING ? 5000 : 0, // 생성 중일 때만 5초마다 갱신
    }
  );

  return {
    mealPlans: isLoading ? [] : ((data?.data as MealPlan[]) ?? []), // PaginatedResponse의 data 필드 사용
    total: data?.pagination?.total ?? 0,
    page: data?.pagination?.page ?? 1,
    limit: data?.pagination?.limit ?? 20,
    totalPages: data?.pagination?.totalPages ?? 0,
    hasNext: data?.pagination?.hasNext ?? false,
    hasPrev: data?.pagination?.hasPrev ?? false,
    isLoading,
    error,
    refresh: () => mutate(undefined, { revalidate: true }), // 수동 갱신
  };
}

// 식단 삭제 훅
export function useDeleteMealPlan() {
  const { trigger, isMutating } = useSWRMutation('delete-meal-plan', mutators.deleteMealPlan);

  const deleteMealPlan = async (id: string) => {
    try {
      await trigger(id);

      // 관련 캐시 무효화
      await Promise.all([
        // 사용자 식단 목록 캐시 무효화 (모든 페이지)
        mutate((key) => Array.isArray(key) && key[0] === 'meal-plans' && key[1] === 'user'),
        // 개별 식단 캐시 무효화
        mutate(MEAL_PLAN_KEYS.byId(id), undefined, { revalidate: false }),
        // 모든 상태별 식단 캐시 무효화
        mutate((key) => Array.isArray(key) && key[0] === 'meal-plans' && key[1] === 'status'),
      ]);

      return true;
    } catch (error) {
      throw error;
    }
  };

  return {
    deleteMealPlan,
    isDeleting: isMutating,
  };
}

// 식단 수정 훅
export function useUpdateMealPlan() {
  const { trigger, isMutating } = useSWRMutation('update-meal-plan', mutators.updateMealPlan);

  const updateMealPlan = async (id: string, data: Partial<CreateMealPlanDto>) => {
    try {
      const updatedMealPlan = await trigger({ id, data });

      // 관련 캐시 업데이트
      await Promise.all([
        // 개별 식단 캐시 업데이트
        mutate(MEAL_PLAN_KEYS.byId(id), updatedMealPlan, { revalidate: false }),
        // 사용자 식단 목록 캐시 갱신
        mutate((key) => Array.isArray(key) && key[0] === 'meal-plans' && key[1] === 'user'),
        // 상태별 식단 캐시 갱신 (상태가 변경될 수 있으므로)
        mutate((key) => Array.isArray(key) && key[0] === 'meal-plans' && key[1] === 'status'),
      ]);

      return updatedMealPlan;
    } catch (error) {
      throw error;
    }
  };

  return {
    updateMealPlan,
    isUpdating: isMutating,
  };
}

// 전체 식단 관리 훅 (통합)
export function useMealPlanManager() {
  const { deleteMealPlan, isDeleting } = useDeleteMealPlan();
  const { updateMealPlan, isUpdating } = useUpdateMealPlan();

  // 캐시 수동 갱신 함수
  const refreshAllCaches = async () => {
    await Promise.all([
      mutate((key) => Array.isArray(key) && key[0] === 'meal-plans'),
      mutate((key) => Array.isArray(key) && key[0] === 'meal-plan'),
    ]);
  };

  // 특정 식단의 상태가 변경되었을 때 캐시 업데이트
  const updateMealPlanStatus = async (id: string, status: MealPlanStatus) => {
    // 개별 식단 캐시 업데이트 (부분 업데이트)
    mutate(
      MEAL_PLAN_KEYS.byId(id),
      (current: MealPlan | undefined) =>
        current ? { ...current, status, updatedAt: new Date().toISOString() } : current,
      { revalidate: false }
    );

    // 상태별 캐시는 재검증 필요
    await mutate((key) => Array.isArray(key) && key[0] === 'meal-plans' && key[1] === 'status');
  };

  return {
    deleteMealPlan,
    updateMealPlan,
    updateMealPlanStatus,
    refreshAllCaches,
    isDeleting,
    isUpdating,
  };
}

// 생성 중인 식단 실시간 모니터링 훅
export function useGeneratingMealPlans() {
  const { mealPlans, total, page, limit, totalPages, hasNext, hasPrev, isLoading, error, refresh } =
    useMealPlansByStatus(MealPlanStatus.GENERATING);
  return {
    generatingMealPlans: mealPlans,
    count: mealPlans.length,
    total,
    page,
    limit,
    totalPages,
    hasNext,
    hasPrev,
    isLoading,
    error,
    refresh,
  };
}
