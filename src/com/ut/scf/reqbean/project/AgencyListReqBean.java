package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.PageReqBean;

public class AgencyListReqBean extends PageReqBean{

	private String agencyName;
	private String agencyNum;
	private String maxCreditAmout;
	private String useAbleCrediAmt;
	private String lsmaxCreditAmout;
	private String lsuseAbleCrediAmt;
	private String dzId;
	private String lsId;
	private String ywlxId;
	private byte sysType;
	
	public String getLsmaxCreditAmout() {
		return lsmaxCreditAmout;
	}
	public void setLsmaxCreditAmout(String lsmaxCreditAmout) {
		this.lsmaxCreditAmout = lsmaxCreditAmout;
	}
	public String getLsuseAbleCrediAmt() {
		return lsuseAbleCrediAmt;
	}
	public void setLsuseAbleCrediAmt(String lsuseAbleCrediAmt) {
		this.lsuseAbleCrediAmt = lsuseAbleCrediAmt;
	}
	public String getDzId() {
		return dzId;
	}
	public void setDzId(String dzId) {
		this.dzId = dzId;
	}
	public String getLsId() {
		return lsId;
	}
	public void setLsId(String lsId) {
		this.lsId = lsId;
	}
	
	
	public byte getSysType() {
		return sysType;
	}
	public void setSysType(byte sysType) {
		this.sysType = sysType;
	}
	public String getAgencyName() {
		return agencyName;
	}
	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}
	public String getAgencyNum() {
		return agencyNum;
	}
	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}
	public String getMaxCreditAmout() {
		return maxCreditAmout;
	}
	public void setMaxCreditAmout(String maxCreditAmout) {
		this.maxCreditAmout = maxCreditAmout;
	}
	public String getUseAbleCrediAmt() {
		return useAbleCrediAmt;
	}
	public void setUseAbleCrediAmt(String useAbleCrediAmt) {
		this.useAbleCrediAmt = useAbleCrediAmt;
	}
	public String getYwlxId() {
		return ywlxId;
	}
	public void setYwlxId(String ywlxId) {
		this.ywlxId = ywlxId;
	}
}
