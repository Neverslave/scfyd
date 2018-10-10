package com.ut.scf.reqbean.pub;

import java.math.BigDecimal;
import java.util.List;

public class CustProcessReqBean {
	private String corpName;
	private String orginName;
	public String getOrginName() {
		return orginName;
	}
	public void setOrginName(String orginName) {
		this.orginName = orginName;
	}
	private String corpType;
	private String agencyNum;
	private String orgnNum;
	private Short sysType;
	private BigDecimal maxCreditAmount;//大宗最高授信额度
	private String area;
	private String represent;
	private String legalPerson;
	private String controlPerson;
	private BigDecimal regCap;
	private String officeAddress;
	private String regAddress;
	private String busiScope;
	private String fixedPhone;
	private String contactInfo;
	private String orginCorpName ="0";
	private String orginAgencyNum ="0";
	private String orginOrgnNum ="0";
	private List<?> shareInfoList;
	private List<?> attachInfoList;
	private String corpId;
	private String isEdit;
	private String userId;
	private String roleId;
	private String activitiKey;
	private Integer num;
	private String email;//邮件
	private String companyUrl;//网址
	private String companyPicturePath1;//图片地址1
	private String companyPicturePath2;
	private String companyPicturePath3;
	private String companyPicturePath4;
	private String companyPicturePath5;
	private String companyPicturePath6;
	private String businessRegistrationNumber;//工商注册号
	private String uniformCreditCode;//统一信用码
	private String taxpayerRegistrationNumber;//纳税人识别号
	private String operatingPeriod;//营业期限
	private String legalIdNumber;//法人代表身份证号码
	private String legalPhoneNumber;//法人代表联系方式
	private String controlIdNumber;//实际控制人身份证号码
	private String controlPhoneNumber;//实际控制人联系方式
	private String financePerson;//财务
	private String financeIdNumber;//财务身份证号码
	private String financePhoneNumber;//财务联系方式
	private String messenger;//信息员
	private String messengerIdNumber;//信息员身份证号码
	private String messengerPhoneNumber;//信息员联系方式
	private String businessLicensePath;//营业执照地址
	private String permissionAccountPath;//开户许可地址
	private String legalIdNumberPath1;//法人身份证正面
	private String legalIdNumberPath2;//法人身份证反面
	private String maxLscreditAmount;//零售最高授信额度
	private List<?> contractInfoList;
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public String getAgencyNum() {
		return agencyNum;
	}
	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}
	public String getOrgnNum() {
		return orgnNum;
	}
	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
	}
	public Short getSysType() {
		return sysType;
	}
	public void setSysType(Short sysType) {
		this.sysType = sysType;
	}
	public BigDecimal getMaxCreditAmount() {
		return maxCreditAmount;
	}
	public void setMaxCreditAmount(BigDecimal maxCreditAmount) {
		this.maxCreditAmount = maxCreditAmount;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getRepresent() {
		return represent;
	}
	public void setRepresent(String represent) {
		this.represent = represent;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	
	public String getOfficeAddress() {
		return officeAddress;
	}
	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}
	public String getFixedPhone() {
		return fixedPhone;
	}
	public void setFixedPhone(String fixedPhone) {
		this.fixedPhone = fixedPhone;
	}
	public String getContactInfo() {
		return contactInfo;
	}
	public void setContactInfo(String contactInfo) {
		this.contactInfo = contactInfo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getActivitiKey() {
		return activitiKey;
	}
	public void setActivitiKey(String activitiKey) {
		this.activitiKey = activitiKey;
	}

	public BigDecimal getRegCap() {
		return regCap;
	}
	public void setRegCap(BigDecimal regCap) {
		this.regCap = regCap;
	}
	public List<?> getShareInfoList() {
		return shareInfoList;
	}
	public void setShareInfoList(List<?> shareInfoList) {
		this.shareInfoList = shareInfoList;
	}
	public List<?> getAttachInfoList() {
		return attachInfoList;
	}
	public void setAttachInfoList(List<?> attachInfoList) {
		this.attachInfoList = attachInfoList;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getIsEdit() {
		return isEdit;
	}
	public void setIsEdit(String isEdit) {
		this.isEdit = isEdit;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getOrginCorpName() {
		return orginCorpName;
	}
	public void setOrginCorpName(String orginCorpName) {
		this.orginCorpName = orginCorpName;
	}
	public String getOrginAgencyNum() {
		return orginAgencyNum;
	}
	public void setOrginAgencyNum(String orginAgencyNum) {
		this.orginAgencyNum = orginAgencyNum;
	}
	public String getOrginOrgnNum() {
		return orginOrgnNum;
	}
	public void setOrginOrgnNum(String orginOrgnNum) {
		this.orginOrgnNum = orginOrgnNum;
	}
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	public String getEmail() {
		return email;
	}
	public String getCompanyUrl() {
		return companyUrl;
	}
	public String getCompanyPicturePath1() {
		return companyPicturePath1;
	}
	public String getCompanyPicturePath2() {
		return companyPicturePath2;
	}
	public String getCompanyPicturePath3() {
		return companyPicturePath3;
	}
	public String getCompanyPicturePath4() {
		return companyPicturePath4;
	}
	public String getCompanyPicturePath5() {
		return companyPicturePath5;
	}
	public String getCompanyPicturePath6() {
		return companyPicturePath6;
	}
	public String getBusinessRegistrationNumber() {
		return businessRegistrationNumber;
	}
	public String getUniformCreditCode() {
		return uniformCreditCode;
	}
	public String getTaxpayerRegistrationNumber() {
		return taxpayerRegistrationNumber;
	}
	public String getOperatingPeriod() {
		return operatingPeriod;
	}
	public String getLegalIdNumber() {
		return legalIdNumber;
	}
	public String getLegalPhoneNumber() {
		return legalPhoneNumber;
	}
	public String getControlIdNumber() {
		return controlIdNumber;
	}
	public String getControlPhoneNumber() {
		return controlPhoneNumber;
	}
	public String getFinancePerson() {
		return financePerson;
	}
	public String getFinanceIdNumber() {
		return financeIdNumber;
	}
	public String getFinancePhoneNumber() {
		return financePhoneNumber;
	}
	public String getMessenger() {
		return messenger;
	}
	public String getMessengerIdNumber() {
		return messengerIdNumber;
	}
	public String getMessengerPhoneNumber() {
		return messengerPhoneNumber;
	}
	public String getBusinessLicensePath() {
		return businessLicensePath;
	}
	public String getPermissionAccountPath() {
		return permissionAccountPath;
	}
	public String getLegalIdNumberPath1() {
		return legalIdNumberPath1;
	}
	public String getLegalIdNumberPath2() {
		return legalIdNumberPath2;
	}
	public List<?> getContractInfoList() {
		return contractInfoList;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setCompanyUrl(String companyUrl) {
		this.companyUrl = companyUrl;
	}
	public void setCompanyPicturePath1(String companyPicturePath1) {
		this.companyPicturePath1 = companyPicturePath1;
	}
	public void setCompanyPicturePath2(String companyPicturePath2) {
		this.companyPicturePath2 = companyPicturePath2;
	}
	public void setCompanyPicturePath3(String companyPicturePath3) {
		this.companyPicturePath3 = companyPicturePath3;
	}
	public void setCompanyPicturePath4(String companyPicturePath4) {
		this.companyPicturePath4 = companyPicturePath4;
	}
	public void setCompanyPicturePath5(String companyPicturePath5) {
		this.companyPicturePath5 = companyPicturePath5;
	}
	public void setCompanyPicturePath6(String companyPicturePath6) {
		this.companyPicturePath6 = companyPicturePath6;
	}
	public void setBusinessRegistrationNumber(String businessRegistrationNumber) {
		this.businessRegistrationNumber = businessRegistrationNumber;
	}
	public void setUniformCreditCode(String uniformCreditCode) {
		this.uniformCreditCode = uniformCreditCode;
	}
	public void setTaxpayerRegistrationNumber(String taxpayerRegistrationNumber) {
		this.taxpayerRegistrationNumber = taxpayerRegistrationNumber;
	}
	public void setOperatingPeriod(String operatingPeriod) {
		this.operatingPeriod = operatingPeriod;
	}
	public void setLegalIdNumber(String legalIdNumber) {
		this.legalIdNumber = legalIdNumber;
	}
	public void setLegalPhoneNumber(String legalPhoneNumber) {
		this.legalPhoneNumber = legalPhoneNumber;
	}
	public void setControlIdNumber(String controlIdNumber) {
		this.controlIdNumber = controlIdNumber;
	}
	public void setControlPhoneNumber(String controlPhoneNumber) {
		this.controlPhoneNumber = controlPhoneNumber;
	}
	public void setFinancePerson(String financePerson) {
		this.financePerson = financePerson;
	}
	public void setFinanceIdNumber(String financeIdNumber) {
		this.financeIdNumber = financeIdNumber;
	}
	public void setFinancePhoneNumber(String financePhoneNumber) {
		this.financePhoneNumber = financePhoneNumber;
	}
	public void setMessenger(String messenger) {
		this.messenger = messenger;
	}
	public void setMessengerIdNumber(String messengerIdNumber) {
		this.messengerIdNumber = messengerIdNumber;
	}
	public void setMessengerPhoneNumber(String messengerPhoneNumber) {
		this.messengerPhoneNumber = messengerPhoneNumber;
	}
	public void setBusinessLicensePath(String businessLicensePath) {
		this.businessLicensePath = businessLicensePath;
	}
	public void setPermissionAccountPath(String permissionAccountPath) {
		this.permissionAccountPath = permissionAccountPath;
	}
	public void setLegalIdNumberPath1(String legalIdNumberPath1) {
		this.legalIdNumberPath1 = legalIdNumberPath1;
	}
	public void setLegalIdNumberPath2(String legalIdNumberPath2) {
		this.legalIdNumberPath2 = legalIdNumberPath2;
	}
	public void setContractInfoList(List<?> contractInfoList) {
		this.contractInfoList = contractInfoList;
	}
	public String getMaxLscreditAmount() {
		return maxLscreditAmount;
	}
	public void setMaxLscreditAmount(String maxLscreditAmount) {
		this.maxLscreditAmount = maxLscreditAmount;
	}
	public String getRegAddress() {
		return regAddress;
	}
	public String getBusiScope() {
		return busiScope;
	}
	public void setRegAddress(String regAddress) {
		this.regAddress = regAddress;
	}
	public void setBusiScope(String busiScope) {
		this.busiScope = busiScope;
	}
	public String getControlPerson() {
		return controlPerson;
	}
	public void setControlPerson(String controlPerson) {
		this.controlPerson = controlPerson;
	}
	
}
