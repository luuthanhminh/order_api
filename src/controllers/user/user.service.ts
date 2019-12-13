import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models';
import { Repository } from 'typeorm';
import { BaseResponse } from '../../data/base.response';
import { JwtService } from '@nestjs/jwt';
import { RegisterBindingModel } from '../../data/bindings/register.model';
import {Validator} from 'class-validator';
import { UpdateUserBindingModel } from '../../data/bindings/update.user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(username: string, pass: string): Promise<BaseResponse> {
        const validator = new Validator();
        if (validator.isEmpty(username) || !validator.isEmail(username)) {
            return new BaseResponse(null, 'Email is invalid.', HttpStatus.BAD_REQUEST);
        }

        if (validator.isEmpty(pass)) {
            return new BaseResponse(null, 'Password must be set.', HttpStatus.BAD_REQUEST);
        }

        const user = await this.repo.findOne({email: username});
        if (user) {
            if (user.password === pass) {
                const payload = { email: user.email, sub: user.id };
                const obj: any = {};
                obj.access_token = this.jwtService.sign(payload);
                obj.email = user.email;
                obj.user_id = user.id;
                return new BaseResponse(obj, null);
            } else {
                return new BaseResponse(null, 'email or password is incorrect.', HttpStatus.BAD_REQUEST);
            }
        } else {
            return new BaseResponse(null, 'User not found.', HttpStatus.NOT_FOUND);
        }
      }
    async register(registerModel: RegisterBindingModel): Promise<BaseResponse> {
        const validator = new Validator();
        if (validator.isEmpty(registerModel.email) || !validator.isEmail(registerModel.email)) {
            return new BaseResponse(null, 'Email is invalid.', HttpStatus.BAD_REQUEST);
        }

        if (validator.isEmpty(registerModel.password)) {
            return new BaseResponse(null, 'Password must be set.', HttpStatus.BAD_REQUEST);
        }

        let user = await this.repo.findOne({email: registerModel.email});
        if (user) {
            return new BaseResponse(null, 'email already exists.', HttpStatus.BAD_REQUEST);
        }
        user = new User();
        user.email = registerModel.email;
        user.password = registerModel.password;
        user.firstName = registerModel.firstName;
        user.lastName = registerModel.lastName;

        user = await this.repo.save(user);

        return new BaseResponse('Created', null, HttpStatus.CREATED);
    }

    async getUser(userId: string): Promise<BaseResponse> {
        const user = await this.repo.findOne(userId);
        if (!user) {
            return new BaseResponse(null, 'User not found.', HttpStatus.NOT_FOUND);
        }
        const result: any = {};
        result.name = user.lastName + ' ' + user.firstName;
        result.firstName = user.firstName;
        result.lastName = user.lastName;
        result.email = user.email;
        result.avatar = user.avatar;
        result.phone = user.phoneNumber;
        result.address = user.address;

        return new BaseResponse(result, null);
    }

    async updateUser(userId: string, updateUser: UpdateUserBindingModel): Promise<BaseResponse> {
        let user = await this.repo.findOne(userId);
        if (!user) {
            return new BaseResponse(null, 'User not found.', HttpStatus.NOT_FOUND);
        }
        if (updateUser.firstName) {
            user.firstName = updateUser.firstName;
        }

        if (updateUser.lastName) {
            user.lastName = updateUser.lastName;
        }

        if (updateUser.avatar && updateUser.avatar !== '') {
            user.avatar = updateUser.avatar;
        }

        user = await this.repo.save(user);

        const result: any = {};
        result.name = user.lastName + ' ' + user.firstName;
        result.firstName = user.firstName;
        result.lastName = user.lastName;
        result.email = user.email;
        result.avatar = user.avatar;
        result.phone = user.phoneNumber;
        result.address = user.address;

        return new BaseResponse(result, null);
    }
}
