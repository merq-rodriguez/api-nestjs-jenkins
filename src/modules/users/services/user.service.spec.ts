import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService;
  let userRepository;
  const mockUserRepository = () => ({
    createUser: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();
    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('createUsers', () => {
    it('should save a user in the database', async () => {
      userRepository.createUser.mockResolvedValue('someUser');
      expect(userRepository.createUser).not.toHaveBeenCalled();
      const createUserDto = {
        names: "",
        password: "",
        username: "",
        email: "#",
      };
      const result = await userService.createUser(createUserDto);
      expect(userRepository.createUser).toHaveBeenCalledWith(
        createUserDto,
      );
      expect(result).toEqual('someUser');
    });
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      userRepository.find.mockResolvedValue('someUsers');
      expect(userRepository.find).not.toHaveBeenCalled();

      const result = await userService.getUsers();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someUsers');
    });
  });

  describe('findUser', () => {
    it('should retrieve a user with an ID', async () => {
      const mockUser = {
        "id":1,
        "names":"xxx",
        "username":"xx",
        "password":"$2b$10$cql9LDkOyn4FEEYp1EuLkOfSM81nb15q9h1t4XI42bDmnpb741.IO",
        "email":"info@gmail.com",
        "state":true
      };
      userRepository.findOne.mockResolvedValue(mockUser);
      const result = await userService.findUser(1);
      expect(result).toEqual(mockUser);
      //expect(userRepository.findOne).toHaveBeenCalledWith(expect.objectContaining(mockUser));
    });

    it('throws an error as a user is not found', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(userService.findUser(1)).rejects.toThrow(null);
      //expect(userService.findUser(1)).rejects.toThrow(NotFoundException);
    });
  });


  describe('deleteUser', () => {
    it('should delete user', async () => {
      userRepository.delete.mockResolvedValue(1);
      expect(userRepository.delete).not.toHaveBeenCalled();
      await userService.deleteUser(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});