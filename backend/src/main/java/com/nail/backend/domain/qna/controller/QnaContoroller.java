package com.nail.backend.domain.qna.controller;

import com.nail.backend.common.model.response.BaseResponseBody;
import com.nail.backend.domain.qna.db.entity.Qna;
import com.nail.backend.domain.qna.request.QnaModifyPutReq;
import com.nail.backend.domain.qna.request.QnaRegisterPostReq;
import com.nail.backend.domain.qna.service.QnaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@Slf4j
@Api(value = "문의 관리 Api")
@RestController
@RequestMapping("/api/qna")
public class QnaContoroller {

    @Autowired
    QnaService qnaService;


//    CREATE_________________________________________
    @Transactional
    @ApiOperation(value = "문의 글 작성")
    @ApiResponses({
            @ApiResponse(code = 201, message = "등록 성공"),
            @ApiResponse(code = 404, message = "등록 실패")
    })
    @PostMapping
    public ResponseEntity<BaseResponseBody> qnaRegister(@RequestPart QnaRegisterPostReq qnaRegisterPostReq){

        log.info("qnaRegister - 호출");
        Long userId = Long.valueOf(1L);
        Qna res = qnaService.qnaRegister(qnaRegisterPostReq,userId);
        if(!res.equals(null)){
            return ResponseEntity.status(201).body(BaseResponseBody.of(201,"등록 성공"));
        }
        else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"등록실패"));
        }
    }







//    READ___________________________________________


//    UPDATE_________________________________________
    @Transactional
    @ApiOperation(value = "문의 글 수정")
    @ApiResponses({
            @ApiResponse(code = 201, message = "수정 성공"),
            @ApiResponse(code = 404, message = "수정 실패")
    })
    @PutMapping
    public ResponseEntity<BaseResponseBody> qnaUpdate(@RequestPart QnaModifyPutReq qnaModifyPutReq){
        log.info("qnaModify - 호출");

        if(qnaService.qnaModify(qnaModifyPutReq)== 0) {
            log.error("qnaModify - This qnaSeq doesn't exist");
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"수정 실패"));
        }
        else
            return ResponseEntity.status(200).body(BaseResponseBody.of(200,"수정 성공"));
    }



//    DELETE_________________________________________

}
