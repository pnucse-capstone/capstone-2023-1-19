package pnu.cse.cloudchain.contract.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CustomExceptionStatus {


    /**
     *
     */
    USERID_NOT_FOUND("Userid Not Founded"),
    CAR_NOT_FOUND( "CAR Not Found"),
    WRONG_PASSWORD("Wrong Password"),
    DUPLICATED_EMAIL("Duplicated Email Address"),
    EMPTY_EMAIL("Empty Email"),
    INVALID_EMAIL("Invalid Email"),
    DUPLICATED_USERID("Duplicated Userid"),
    ACCOUNT_NOT_FOUND( "Account Not Found"),
    EMAIL_NOT_FOUND( "Email Not Found"),
    INVALID_PARAM( "Invalid Type Parameter"),
    WRONG_ID("Wrong ID"),
    INCORRECT_IMAGE_FORMAT("Incorrect Image Format");



    private String description;


}
