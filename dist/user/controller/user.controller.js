"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const role_decorator_1 = require("../../auth/decorator/role.decorator");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const CreateUser_dto_1 = require("../models/dto/CreateUser.dto");
const LoginUser_dto_1 = require("../models/dto/LoginUser.dto");
const user_interface_1 = require("../models/user.interface");
const user_service_1 = require("../service/user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAllUser() {
        return this.userService.findAll();
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    deleteOne(id) {
        return this.userService.deleteOne(Number(id));
    }
    login(loginUserDto) {
        return this.userService.login(loginUserDto).pipe(operators_1.map((jwt) => {
            return {
                access_token: jwt,
                token_type: 'JWT',
                expires_in: 10000,
            };
        }));
    }
    updateRoleOfUser(id, user) {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
    helloWorld() {
        return 'Hello world';
    }
};
__decorate([
    role_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN, user_interface_1.UserRole.USER),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAllUser", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "create", null);
__decorate([
    role_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteOne", null);
__decorate([
    common_1.Post('login'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "login", null);
__decorate([
    role_decorator_1.hasRoles(user_interface_1.UserRole.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    common_1.Put(':id/role'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateRoleOfUser", null);
__decorate([
    common_1.Get('/hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], UserController.prototype, "helloWorld", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map