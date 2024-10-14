/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users =[
        {
            id:0,
            name: "Basheer",
            phone: 9823982828,
            status: "active"
        },
        {
            id:1,
            name:"Ali",
            phone: 829832474,
            status:'active'
        },
        {
            id:2,
            name:"Prahan",
            phone: 829832474,
            status:'inactive'
        }
    ];

    // Create new Entry
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const id = new Date().getTime();
    const user={...createUserDto, id : +id, status : 'active'};
    // console.log(user);
    this.users=[...this.users,user];
    return user;
  }

//Get All users
  findAll() {
    const users = this.users.filter((u)=>{
        return u.status == 'active';
    });
    return users;
  }

  // Get Single User By id
  findOne(id: number) {
    const user = this.users.filter((u)=>{
        return u.id==+id && u.status == 'active';
    });
    if(user.length==0) return "No User with id "+id;
    return user[0];
  }

// Update User
  update(id: number, updateUserDto: UpdateUserDto) {
    const user=this.users.filter((u)=>{
        return u.id==id && u.status=='active';
    })
    if(user.length==0) return "No such User";
    const remainingUsers=this.users.filter((u)=>{
        return u.id!=id;
    })
    const updatedUser={...user[0],...updateUserDto};
    this.users=[...remainingUsers,updatedUser];
    return updatedUser;
  }
  
  // Delete User ie. make user user status inactive
  remove(id: number) {
    const user=this.users.filter((u)=>{
        return u.id==id && u.status=='active';
    });
    const remainingUsers=this.users.filter((u)=>{
        return u.id!=id;
    })
    if(user.length==0) return "User is not present in dataset";
    const deletedUser={...user[0],status:'inactive'};
    this.users=[...remainingUsers,deletedUser];
    console.log(this.users);
    return deletedUser;
  }
}
