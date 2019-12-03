import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models';
import { Repository } from 'typeorm';
import { BaseResponse } from '../../data/base.response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(username: string, pass: string): Promise<BaseResponse> {
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
    async register(username: string, pass: string): Promise<BaseResponse> {
        let user = await this.repo.findOne({email: username});
        if (!user) {
            return new BaseResponse(null, 'email already exists.', HttpStatus.BAD_REQUEST);
        }
        user = new User();
        user.email = username;
        user.password = pass;

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
        result.email = user.email;
        result.avatar = user.avatar;
        result.phone = user.phoneNumber;
        result.address = user.address;

        return new BaseResponse(result, null);
    }
}
