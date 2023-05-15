import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomMessagesController } from './chatroom-messages.controller';
import { ChatroomMessagesService } from './chatroom-messages.service';

describe('ChatroomMessagesController', () => {
  let controller: ChatroomMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomMessagesController],
      providers: [ChatroomMessagesService],
    }).compile();

    controller = module.get<ChatroomMessagesController>(ChatroomMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
