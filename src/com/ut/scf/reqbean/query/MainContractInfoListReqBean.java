package com.ut.scf.reqbean.query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.ut.scf.reqbean.PageReqBean;

public class MainContractInfoListReqBean extends PageReqBean {

	private String id;//主合同表id
	private String contractName;//合同名称
	private String contractNum;//合同编号
	private String typeid;//合同类型id
	private BigDecimal amount;//额度
	private String endDate;//合同结束日期
	private String createTime;//创建时间
	private String rzhgz;//融资涵规则
	private String fkhgz;//付款涵规则
	private int status;//状态 0有效1无效
	private String fileId;//附件id
	private List<?> contractMainList;
	public String getId() {
		return id;
	}
	public String getContractName() {
		return contractName;
	}
	public String getContractNum() {
		return contractNum;
	}
	public String getTypeid() {
		return typeid;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public String getEndDate() {
		return endDate;
	}
	public String getCreateTime() {
		return createTime;
	}
	public String getRzhgz() {
		return rzhgz;
	}
	public String getFkhgz() {
		return fkhgz;
	}
	public int getStatus() {
		return status;
	}
	public String getFileId() {
		return fileId;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public void setContractNum(String contractNum) {
		this.contractNum = contractNum;
	}
	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public void setRzhgz(String rzhgz) {
		this.rzhgz = rzhgz;
	}
	public void setFkhgz(String fkhgz) {
		this.fkhgz = fkhgz;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public List<?> getContractMainList() {
		return contractMainList;
	}
	public void setContractMainList(List<?> contractMainList) {
		this.contractMainList = contractMainList;
	}
	
	
}
