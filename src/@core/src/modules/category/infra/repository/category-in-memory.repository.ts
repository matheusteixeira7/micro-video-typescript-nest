import { InMemorySearchableRepository } from "#seedwork/domain/repository/";

import { Category } from "#modules/category/domain/entities/";
import { CategoryRepository } from "#modules/category/domain/repository/";

export class CategoryInMemoryRepository
    extends InMemorySearchableRepository<Category>
    implements CategoryRepository.Repository
{
    protected async applyFilter(
        items: Category[],
        filter: CategoryRepository.Filter
    ): Promise<Category[]> {
        if (!filter) {
            return items;
        }

        return items.filter((i) => {
            return i.props.name.toLowerCase().includes(filter.toLowerCase());
        });
    }
}
