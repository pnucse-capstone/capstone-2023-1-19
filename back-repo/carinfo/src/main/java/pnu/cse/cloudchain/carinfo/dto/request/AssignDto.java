package pnu.cse.cloudchain.carinfo.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignDto {
    private String name;
    private String residentRegistrationNumber;
    private String phoneNumber;
    private String address;
}
