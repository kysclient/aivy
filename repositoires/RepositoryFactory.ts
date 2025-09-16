import { MealPlanRepository } from './MealPlanRepository';
import { UserRepository } from './UserRepository';

class RepositoryFactory {
    private static instance: RepositoryFactory;

    private userRepository: UserRepository;
    private mealPlanRepository: MealPlanRepository;

    private constructor() {
        this.userRepository = new UserRepository();
        this.mealPlanRepository = new MealPlanRepository();
    }

    static getInstance(): RepositoryFactory {
        if (!RepositoryFactory.instance) {
            RepositoryFactory.instance = new RepositoryFactory();
        }
        return RepositoryFactory.instance;
    }

    getUserRepository(): UserRepository {
        return this.userRepository;
    }
    getMealPlanRepository(): MealPlanRepository {
        return this.mealPlanRepository;
    }
}

export const repositoryFactory = RepositoryFactory.getInstance();

export const userRepository = repositoryFactory.getUserRepository();
export const mealPlanRepository = repositoryFactory.getMealPlanRepository();