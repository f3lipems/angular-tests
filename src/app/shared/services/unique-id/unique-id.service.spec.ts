import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {
    let service: UniqueIdService = null;
    beforeEach(() => {
        service = new UniqueIdService();
    })

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
        const id = service.generateUniqueIdWithPrefix('app');

        // expect(id).toContain('app-');
        expect(id.startsWith('app-')).toBeTrue();
    });

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not be generated duplicated when called multiple times`, () => {
        const ids = new Set();
        const times = 10000;

        for (let i = 0; i < times; i++) {
            ids.add(service.generateUniqueIdWithPrefix('app'));
        }
        expect(ids.size).toBe(times);

        // const firstId = service.generateUniqueIdWithPrefix('app');
        // const secondId = service.generateUniqueIdWithPrefix('app');
        // expect(firstId).not.toBe(secondId);
    });

    it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} should return te number of generated Ids created`, () => {
        service.generateUniqueIdWithPrefix('app');
        service.generateUniqueIdWithPrefix('app');
        expect(service.getNumberOfGeneratedUniqueIds()).toBe(2)
    })

    it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should should throw when called with field empty`, () => {
        const emptyValues = [null, undefined, '', '0', '1']
        emptyValues.forEach(value => {
            expect(() => service.generateUniqueIdWithPrefix(value))
            .withContext(`Enpty value - ${value}`)
            .toThrow();
        });
    });
});