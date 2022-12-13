import { Entity } from "#seedwork/domain/entity";
import { InMemoryRepository } from "#seedwork/domain/repository";
import { UniqueEntityId } from "#seedwork/domain/value-objects";

type StubEntityProps = {
    name: string;
    price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("In Memory Repository Unit Tests", () => {
    let repository: StubInMemoryRepository;

    beforeEach(() => {
        repository = new StubInMemoryRepository();
    });

    it("should insert a new entity", async () => {
        const entity = new StubEntity({ name: "test", price: 10 });
        await repository.insert(entity);

        expect(entity.toJSON()).toStrictEqual(repository.entities[0].toJSON());
    });

    it("should throw error when entity is not found", async () => {
        expect(repository.findById("invalid id")).rejects.toThrowError(
            "Entity with id invalid id not found"
        );
    });

    it("should throw error when entity is not found with a id value object as parameter", async () => {
        const id = new UniqueEntityId();

        expect(repository.findById(id)).rejects.toThrowError(
            `Entity with id ${id} not found`
        );
    });

    it("should find an entity by id", async () => {
        const entity = new StubEntity({ name: "test", price: 10 });
        await repository.insert(entity);

        const foundEntity = await repository.findById(entity.id);

        expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
    });

    it("should return all entities", async () => {
        const entity = new StubEntity({ name: "test", price: 10 });
        const entity2 = new StubEntity({ name: "test2", price: 10 });

        await repository.insert(entity);
        await repository.insert(entity2);

        const foundEntities = await repository.findAll();

        expect(foundEntities.length).toBe(2);
        expect(foundEntities[0].toJSON()).toStrictEqual(entity.toJSON());
        expect(foundEntities[1].toJSON()).toStrictEqual(entity2.toJSON());
    });

    it("should throw error on update method when entity does not exist", async () => {
        const entity = new StubEntity({ name: "test", price: 10 });

        expect(repository.update(entity)).rejects.toThrowError(
            `Entity with id ${entity.id} not found`
        );
    });

    it("should update an entity", async () => {
        const entity = new StubEntity({ name: "test", price: 10 });
        await repository.insert(entity);

        const entityUpdated = new StubEntity(
            { name: "test updated", price: 10 },
            entity.uniqueEntityId
        );
        await repository.update(entityUpdated);
        const foundEntity = await repository.findById(entity.id);

        expect(foundEntity.toJSON()).toStrictEqual(entityUpdated.toJSON());
        expect(foundEntity.toJSON()).not.toStrictEqual(entity.toJSON());
    });

    it("should throw error on delete method when entity does not exist", async () => {
        const entity = new StubEntity({ name: "test", price: 10 });

        expect(repository.delete(entity.id)).rejects.toThrowError(
            `Entity with id ${entity.id} not found`
        );

        const id = new UniqueEntityId();

        expect(repository.delete(id)).rejects.toThrowError(
            `Entity with id ${id} not found`
        );
    });

    it("should delete an entity", async () => {
        let entity = new StubEntity({ name: "test", price: 10 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.entities).toHaveLength(0);

        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.entities).toHaveLength(0);
    });
});
