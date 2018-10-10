package com.ut.scf.core.exception;

import com.ut.scf.core.dict.ErrorCode;
import com.ut.scf.core.dict.ErrorCodeEnum;

/**
 * 业务异常，service类，需要回滚事务，可以抛出自定义业务异常
 * 
 * @author sunll
 *
 */
public class BizException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 响应结果错误码
	 */
	private ErrorCodeEnum errorCodeEnum;
	
	/**
	 * 响应结果信息
	 */
	private String errorMsg;

	public BizException() {
		super(ErrorCode.errorMsg(ErrorCodeEnum.BIZ_EXCEPTION));
		setErrorCodeEnum(ErrorCodeEnum.BIZ_EXCEPTION);
	}
	
	public BizException(ErrorCodeEnum ece) {
		super(ErrorCode.errorMsg(ece));
		setErrorCodeEnum(ece);
	}

	public BizException(ErrorCodeEnum ece, String errorMsg) {
		super(errorMsg);
		setErrorCodeEnum(ece);
		setErrorMsg(errorMsg);
	}
	
	public ErrorCodeEnum getErrorCodeEnum() {
		return errorCodeEnum;
	}

	public void setErrorCodeEnum(ErrorCodeEnum errorCodeEnum) {
		this.errorCodeEnum = errorCodeEnum;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

}
