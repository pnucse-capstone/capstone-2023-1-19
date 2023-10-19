package pnu.cse.cloudchain.contract.service;

import org.springframework.stereotype.Service;
import pnu.cse.cloudchain.contract.dto.ContractDto;
import pnu.cse.cloudchain.contract.dto.response.ContractResponseDto;
import pnu.cse.cloudchain.contract.dto.response.ResponseCodeDto;
import pnu.cse.cloudchain.contract.dto.response.ResponseDto;
import pnu.cse.cloudchain.contract.dto.response.SuccessCodeDto;

import java.util.List;

@Service
public class ResponseService {

    public ResponseCodeDto successResponse(ResponseCodeDto dto) {

        return dto;
    }
    public ResponseDto<SuccessCodeDto> successResponse(ResponseDto<SuccessCodeDto> dto) {

        return dto;
    }

    public static ResponseDto<List<ContractResponseDto>> successDataResponse(ResponseDto<List<ContractResponseDto>> dto){

        return dto;
    }

    public static ResponseDto<List<ContractDto>> successDatasResponse(ResponseDto<List<ContractDto>> dto){

        return dto;
    }
}
