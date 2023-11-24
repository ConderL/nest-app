import { Test, TestingModule } from '@nestjs/testing';
import { LucasController } from './lucas.controller';

describe('LucasController', () => {
  let controller: LucasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LucasController],
    }).compile();

    controller = module.get<LucasController>(LucasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
