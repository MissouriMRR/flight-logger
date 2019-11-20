import { Arg, Int, Mutation, Query, Resolver } from "type-graphql"
import { getRepository, Repository } from "typeorm"
import { Organization } from "../entities/organization"
import { User } from "../entities/user"

@Resolver(() => Organization)
export class OrganizationResolver {
	public orgRepo: Repository<Organization> = getRepository(Organization)
	public userRepo: Repository<User> = getRepository(User)

	@Query(() => [Organization])
	protected async organizations(): Promise<Organization[]> {
		return this.orgRepo.find()
	}

	@Mutation(() => Organization)
	protected async createOrganization(
		@Arg("name", () => String) name: string
	): Promise<Organization> {
		const organization: Organization = this.orgRepo.create({ name: name, users: [] })
		return organization.save()
	}

	@Mutation(() => Boolean)
	protected async deleteOrganizationByID(
		@Arg("id", () => Int) id: number
	): Promise<boolean> {
		await this.orgRepo.delete({
			id: id
		})
		return true
	}
}