# API Package

## Source


## Calls

**Table of contents**  
  
[[_TOC_]]


---
### BC[ResgisterCall]
**Name:**  
REGISTER_CALL 

**Description:**  
Registers a new User

**Request:**  
{&nbsp;&nbsp;**email** : String,  
&nbsp;&nbsp;&nbsp;**username** : String,  
&nbsp;&nbsp;&nbsp;**name** : String,  
&nbsp;&nbsp;&nbsp;**surname** : String,  
&nbsp;&nbsp;&nbsp;**password** : String  
}

**Response:**  
{&nbsp;**user_id** : any,  
 &nbsp;&nbsp;&nbsp;**token**:any}  


### BC[UpdateUserCall]
**Name:**  
UPDATE_USER_CALL 

**Description:**  
Updates a User

**Request:**  
{&nbsp;&nbsp;**user_id** : any,  
&nbsp;&nbsp;&nbsp;**user** : UserSkeleton}

**Response:**  
{&nbsp;**updated_user** : User}  

### BC[DeleteUserCall]
**Name:**  
DB_DELETE_USER_CALL 

**Description:**  
Deletes a User

**Request:**  
{&nbsp;&nbsp;**user_id** : any,}

**Response:**  
{} 


### BC[LoginCall]
**Name:**  
LOGIN_CALL  

**Description:**  
Returns a Token to give u the rights of the user

**Request:**  
{&nbsp;&nbsp;**email** : String,  
 &nbsp;&nbsp;&nbsp;**password**:any}  

**Response:**  
{&nbsp;&nbsp;**user_id** : Any,   
&nbsp;&nbsp;&nbsp;**token** : any  
}  


### BC[UserInfoCall]
**Name:**  
USER_INFO_CALL  

**Description:**  
Returns a the User Data

**Request:**  
{&nbsp;**user_id** : any }  

**Response:**  
{&nbsp;&nbsp;**user** : User }  


### BC[FirebaseCall]
**Name:**  
FIREBASE_CALL  

**Description:**  
Register/logs in a Firebase User

**Request:**  
{&nbsp;**firebase_token** : any,  
&nbsp;&nbsp;**email** : string,  
&nbsp;&nbsp;**firebase_id** : string,  
&nbsp;&nbsp;**username** : string}  

**Response:**  
{&nbsp;&nbsp;**user_id** : any,  
 &nbsp;&nbsp;&nbsp;**token** : any}  


### BC[CreatePollCall]
**Name:**  
CREATE_POLL_CALL  

**Description:**  
Creates a Poll  

**Request:**  
{&nbsp;&nbsp;**user_id?** : any,
&nbsp;&nbsp;&nbsp;**creator_name?** :  String,   
&nbsp;&nbsp;&nbsp;**title** :  String,  
&nbsp;&nbsp;&nbsp;**start_date_poll** : Date,  //Umfragezeitraum  
&nbsp;&nbsp;&nbsp;**end_date_poll** : Date,  
&nbsp;&nbsp;&nbsp;**displayed_dates?** : Date[],  
&nbsp;&nbsp;&nbsp;**exposing** : boolean,  //participants see other participants  
&nbsp;&nbsp;&nbsp;**location?** :  String,  
&nbsp;&nbsp;&nbsp;**timeslot_min_duration?** : int,  
&nbsp;&nbsp;&nbsp;**password?** :  String,  
&nbsp;&nbsp;&nbsp;**cal_timesteps** : int,  
&nbsp;&nbsp;&nbsp;**theme** : String,  
&nbsp;&nbsp;&nbsp;**coloe_nav** : String,  
&nbsp;&nbsp;&nbsp;**color_content** : String,  
&nbsp;&nbsp;&nbsp;**color_buttons** : String,  
&nbsp;&nbsp;&nbsp;**logo** : String,  
&nbsp;&nbsp;&nbsp;**timeslots** : Timeslot[],  
&nbsp;&nbsp;&nbsp;**participants?** : String[] 
}  

**Response:**  
{&nbsp;&nbsp;**poll_id** : Any,  
&nbsp;&nbsp;&nbsp;**creator_id** : String  
}  

### BC[SavePollCall]
**Name:**  
SAVE_POLL_CALL  

**Description:**  
Updates a Poll  

**Request:**  
{&nbsp;&nbsp;**poll_id** : Any  
&nbsp;&nbsp;&nbsp;**poll** : PollSkeleton  
}  

**Response:**  
{&nbsp;&nbsp;**poll_id** : any }  


### BC[GetPollCall]
**Name:**  
DB_GET_POLL_CALL    

**Description:**  
Returns a Poll

**Request:**  
{&nbsp;**poll_id** : Any }  

**Response:**  
{&nbsp;&nbsp;**poll** : Poll }  


### BC[DeletePollCall]
**Name:**  
DB_DELETE_POLL_CALL    

**Description:**  
Deletes a Poll

**Request:**  
{&nbsp;**poll_id** : any }  

**Response:**  
{} 

### BC[ParticipateInPollCall]
**Name:**  
PARTICIPATE_IN_POLL_CALL    

**Description:**  
Participate in a Poll

**Request:**  
{&nbsp;&nbsp;**poll_id** : any,  
&nbsp;&nbsp;&nbsp;**user_id?** : any,  
&nbsp;&nbsp;&nbsp;**name** : String,  
&nbsp;&nbsp;&nbsp;**timeslots** : {start_date:Date, end_date:Date}[]  
}  

**Response:**  
{&nbsp;**participant_id** : any }  


### BC[UpdateParticipantCall]
**Name:**  
UPDATE_PARTICIPANT_CALL    

**Description:**  
Updates a Participant of a Poll

**Request:**  
{&nbsp;&nbsp;**participant_id** : any,   
&nbsp;&nbsp;&nbsp;**participant** : ParticipantSkeleton  
}  

**Response:**  
{&nbsp;**updated_participant** : Participant } 


### BC[DeleteParticipantCall]
**Name:**  
DB_DELETE_PARTICIPANT_CALL    

**Description:**  
Deletes a Participant of a Poll

**Request:**  
{&nbsp;&nbsp;**participant_id** : any}  

**Response:**  
{} 


### BC[CreateCommentCall]
**Name:**  
CREATE_COMMENT_CALL  

**Request:**  
{&nbsp;&nbsp;**participant_id** : any,  
&nbsp;&nbsp;&nbsp;**comment** : String }  

**Response:**  
{}  


### BC[UpdateCommentCall]
**Name:**  
UPDATE_COMMENT  

**Request:**  
{&nbsp;&nbsp;**comment_id** : any,  
&nbsp;&nbsp;&nbsp;**comment** : CommentSkeleton  
}  

**Response:**  
{&nbsp;&nbsp;**comment_id** : any }  


### BC[DeleteCommentCall]
**Name:**  
DELETE_COMMENT_CALL  

**Request:**  
{&nbsp;&nbsp;**comment_id** : Any }  

**Response:**  
{}  


### BC[PARTICIPATED_POLLS]
**Name:**  
PARTICIPATED_POLLS  

**Request:**  
{&nbsp;**USER_ID** : Any }  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
}  




### BC[CONTINUED_POLLS_CREATED]
**Name:**  
CONTINUED_POLLS_CREATED  

**Request:**  
{&nbsp;**USER_ID** : Any }  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
}  


### BC[CONTINUED_POLLS_PARTICIPATED]
**Name:**  
CONTINUED_POLLS_PARTICIPATED  

**Request:**  
{&nbsp;**USER_ID** : Any }  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
}  


### BC[CONTINUED_POLLS_TOTAL]
**Name:**  
CONTINUED_POLLS_TOTAL  

**Request:**  
{&nbsp;**USER_ID** : Any }  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
}  


### BC[PAST_POLLS_CREATED]
**Name:**  
PAST_POLLS_CREATED  

**Request:**  
{&nbsp;&nbsp;**USER_ID** : Any}  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
},  
{&nbsp;&nbsp;**error** : `invalid_date_time`,  
&nbsp;&nbsp;&nbsp;**error_description** : A `date` value was not valid, for example if it was not formatted correctly or was out of range.  
}  


### BC[PAST_POLLS_PARTICIPATED]
**Name:**  
PAST_POLLS_PARTICIPATED  

**Request:**  
{&nbsp;&nbsp;**USER_ID** : Any }  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
},  
{&nbsp;&nbsp;**error** : `invalid_date_time`,  
&nbsp;&nbsp;&nbsp;**error_description** : A `date` value was not valid, for example if it was not formatted correctly or was out of range.  
}  


### BC[PAST_POLLS_TOTAL]
**Name:**  
PAST_POLLS_TOTAL  

**Request:**  
{&nbsp;&nbsp;**USER_ID** : Any }  

**Response:**  
{&nbsp;&nbsp;**POLLS** : Poll[] }  

**Error Response:**  
{&nbsp;&nbsp;**error** : `no_such_user`,  
&nbsp;&nbsp;&nbsp;**error_description** : A user id was supplied, but the user does not exist.  
},  
{&nbsp;&nbsp;**error** : `invalid_date_time`,  
&nbsp;&nbsp;&nbsp;**error_description** : A `date` value was not valid, for example if it was not formatted correctly or was out of range.  
}  