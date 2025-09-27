import {
    NotificationRepository,
    Notification,
    CreateNotificationDto,
    UpdateNotificationPreferenceDto,
    NotificationPreferences
} from '@/repositoires/NotificationRepository';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

const notificationRepository = new NotificationRepository();

const NOTIFICATION_KEYS = {
    all: (page?: number, limit?: number, unreadOnly?: boolean) =>
        ['notifications', 'all', { page, limit, unreadOnly }],
    preferences: () => ['notifications', 'preferences'],
    unreadCount: () => ['notifications', 'unreadCount'],
} as const;

const fetchers = {
    getNotifications: async ([, , params]: [string, string, { page?: number; limit?: number; unreadOnly?: boolean }]) => {
        return await notificationRepository.findByUser(params);
    },
    getPreferences: async () => {
        return await notificationRepository.getPreferences();
    },
    getUnreadCount: async () => {
        const result = await notificationRepository.findByUser({ page: 1, limit: 1, unreadOnly: true });
        return result.pagination.total;
    },
};

const mutators = {
    markAsRead: async (url: string, { arg }: { arg: string }) => {
        return await notificationRepository.markAsRead(arg);
    },
    markAllAsRead: async () => {
        return await notificationRepository.markAllAsRead();
    },
    deleteNotification: async (url: string, { arg }: { arg: string }) => {
        return await notificationRepository.delete(arg);
    },
    updatePreferences: async (url: string, { arg }: { arg: UpdateNotificationPreferenceDto }) => {
        return await notificationRepository.updatePreferences(arg);
    },
    createNotification: async (url: string, { arg }: { arg: CreateNotificationDto }) => {
        return await notificationRepository.create(arg);
    },
};

export function useNotifications(page: number = 1, limit: number = 10, unreadOnly: boolean = false) {
    const { data, error, isLoading, mutate: refreshNotifications } = useSWR(
        NOTIFICATION_KEYS.all(page, limit, unreadOnly),
        fetchers.getNotifications,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 10000,
        }
    );


    return {
        notifications: data?.data || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || page,
        totalPages: data?.pagination?.totalPages || 0,
        hasNext: data?.pagination?.hasNext || false,
        hasPrev: data?.pagination?.hasPrev || false,
        isLoading,
        error,
        refresh: refreshNotifications,
    };
}

export function useUnreadNotifications(page: number = 1, limit: number = 10) {
    return useNotifications(page, limit, true);
}

export function useNotificationPreferences() {
    const { data, error, isLoading, mutate: refreshPreferences } = useSWR(
        NOTIFICATION_KEYS.preferences(),
        fetchers.getPreferences,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 30000,
        }
    );

    return {
        preferences: data,
        isLoading,
        error,
        refresh: refreshPreferences,
    };
}

export function useUnreadCount() {
    const { data, error, isLoading, mutate: refreshCount } = useSWR(
        NOTIFICATION_KEYS.unreadCount(),
        fetchers.getUnreadCount,
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 5000,
            refreshInterval: 30000,
        }
    );

    return {
        unreadCount: data || 0,
        isLoading,
        error,
        refresh: refreshCount,
    };
}

export function useMarkNotificationAsRead() {
    const { trigger, isMutating } = useSWRMutation(
        'mark-as-read',
        mutators.markAsRead
    );

    const markAsRead = async (id: string) => {
        try {
            const updatedNotification = await trigger(id);

            await Promise.all([
                mutate(key => Array.isArray(key) && key[0] === 'notifications' && key[1] === 'all'),
                mutate(NOTIFICATION_KEYS.unreadCount()),
            ]);

            return updatedNotification;
        } catch (error) {
            throw error;
        }
    };

    return {
        markAsRead,
        isMarking: isMutating,
    };
}

export function useMarkAllAsRead() {
    const { trigger, isMutating } = useSWRMutation(
        'mark-all-as-read',
        mutators.markAllAsRead
    );

    const markAllAsRead = async () => {
        try {
            await trigger();

            await Promise.all([
                mutate(key => Array.isArray(key) && key[0] === 'notifications' && key[1] === 'all'),
                mutate(NOTIFICATION_KEYS.unreadCount()),
            ]);

            return true;
        } catch (error) {
            throw error;
        }
    };

    return {
        markAllAsRead,
        isMarking: isMutating,
    };
}

export function useDeleteNotification() {
    const { trigger, isMutating } = useSWRMutation(
        'delete-notification',
        mutators.deleteNotification
    );

    const deleteNotification = async (id: string) => {
        try {
            await trigger(id);

            await Promise.all([
                mutate(key => Array.isArray(key) && key[0] === 'notifications' && key[1] === 'all'),
                mutate(NOTIFICATION_KEYS.unreadCount()),
            ]);

            return true;
        } catch (error) {
            throw error;
        }
    };

    return {
        deleteNotification,
        isDeleting: isMutating,
    };
}

export function useUpdateNotificationPreferences() {
    const { trigger, isMutating } = useSWRMutation(
        'update-preferences',
        mutators.updatePreferences
    );

    const updatePreferences = async (data: UpdateNotificationPreferenceDto) => {
        try {
            const updatedPreferences = await trigger(data);

            await mutate(NOTIFICATION_KEYS.preferences(), updatedPreferences, { revalidate: false });

            return updatedPreferences;
        } catch (error) {
            throw error;
        }
    };

    return {
        updatePreferences,
        isUpdating: isMutating,
    };
}

export function useCreateNotification() {
    const { trigger, isMutating } = useSWRMutation(
        'create-notification',
        mutators.createNotification
    );

    const createNotification = async (data: CreateNotificationDto) => {
        try {
            const newNotification = await trigger(data);

            await Promise.all([
                mutate(key => Array.isArray(key) && key[0] === 'notifications' && key[1] === 'all'),
                mutate(NOTIFICATION_KEYS.unreadCount()),
            ]);

            return newNotification;
        } catch (error) {
            throw error;
        }
    };

    return {
        createNotification,
        isCreating: isMutating,
    };
}

export function useNotificationManager() {
    const { markAsRead, isMarking } = useMarkNotificationAsRead();
    const { markAllAsRead, isMarking: isMarkingAll } = useMarkAllAsRead();
    const { deleteNotification, isDeleting } = useDeleteNotification();
    const { updatePreferences, isUpdating } = useUpdateNotificationPreferences();
    const { createNotification, isCreating } = useCreateNotification();

    const refreshAllCaches = async () => {
        await Promise.all([
            mutate(key => Array.isArray(key) && key[0] === 'notifications'),
        ]);
    };

    return {
        markAsRead,
        markAllAsRead,
        deleteNotification,
        updatePreferences,
        createNotification,
        refreshAllCaches,
        isMarking,
        isMarkingAll,
        isDeleting,
        isUpdating,
        isCreating,
        isMutating: isMarking || isMarkingAll || isDeleting || isUpdating || isCreating,
    };
}