import { Query, Resolver, Mutation, Arg, Int } from 'type-graphql'
import { Repository, getRepository } from 'typeorm'
import { User } from '../entities/user'

@Resolver(() => User)
export class UserResolver {
    public userRepo: Repository<User> = getRepository(User)

    @Query(() => [User])
    protected async users(): Promise<User[]> {
        return await this.userRepo.find()
    }

    @Mutation(() => User)
    protected async changeUserEmail(
        @Arg('id', () => Int)
        id: number,
        @Arg('email', () => String)
        email: string
    ): Promise<User> {
        let user: User = await this.userRepo.findOneOrFail({
            id: id,
        })
        user.email = email
        return user.save()
    }

    @Mutation(() => User)
    protected async changeUserPassword(
        @Arg('id', () => Int)
        id: number,
        @Arg('password', () => String)
        password: string
    ): Promise<User> {
        let user: User = await this.userRepo.findOneOrFail({
            id: id,
        })
        user.password = password
        return user.save()
    }

    @Query(() => User)
    protected async returnUserByEmail(
        @Arg('email', () => String)
        email: string
    ): Promise<User> {
        return this.userRepo.findOneOrFail({
            email: email,
        })
    }

    @Query(() => User)
    protected async returnUserByID(
        @Arg('id', () => Int)
        id: number
    ): Promise<User> {
        return this.userRepo.findOneOrFail({
            id: id,
        })
    }

    @Mutation(() => User)
    protected async createUser(
        @Arg('email', () => String)
        email: string,
        @Arg('password', () => String)
        password: string
    ): Promise<User> {
        const user: User = this.userRepo.create({
            email: email,
            password: password,
        })
        return user.save()
    }

    @Mutation(() => Boolean)
    protected async deleteUserByID(
        @Arg('id', () => Int)
        id: number
    ): Promise<boolean> {
        await this.userRepo.delete({
            id: id,
        })
        return true
    }
}
