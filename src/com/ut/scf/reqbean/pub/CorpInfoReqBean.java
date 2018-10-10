package com.ut.scf.reqbean.pub;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class CorpInfoReqBean {

	private String corpId;
	private String corpName;
	private String corpType;
	private String agencyNum;
	private String orgnNum;
	private Short sysType;
	private BigDecimal maxCreditAmount;//大宗最高授信额度
	private BigDecimal useAbleCreditAmt;
	private Byte area;
	private Byte represent;
	private Byte isCountry;
	private String legalPerson;
	private String controlPerson;
	private Date regDate;
	private String logoUrl;
	private Integer realPayCap;
	private String ccy;
	private String loanCardNo;
	private String industry;
	private String nationalTaxRegistration;
	private String localTaxRegistration;
	private String orginCorpName ="0";
	private String orginAgencyNum ="0";
	private String orginOrgnNum ="0";
	private BigDecimal regCap;
	private String regAddress;
	private String officeAddress;
	private String specNatural;
	private String busiScope;
	private String historyEvc;
	private String relaCorpId;
	private Integer staffNum;
	private String fixedPhone;
	private String contactInfo;
	private String note;
	private Date createTime;
	private String createUserId;
	private String activitiKey;
	private Byte status;
	private List<?> shareInfoList;
	private List<?> attachInfoList;
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
	private BigDecimal maxLscreditAmount;//零售最高授信额度
	private List<?> contractInfoList;
	
	private String dzId;
	private String lsId;
	
	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

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

	public BigDecimal getUseAbleCreditAmt() {
		return useAbleCreditAmt;
	}

	public void setUseAbleCreditAmt(BigDecimal useAbleCreditAmt) {
		this.useAbleCreditAmt = useAbleCreditAmt;
	}

	public Byte getArea() {
		return area;
	}

	public void setArea(Byte area) {
		this.area = area;
	}

	public Byte getRepresent() {
		return represent;
	}

	public void setRepresent(Byte represent) {
		this.represent = represent;
	}

	public Byte getIsCountry() {
		return isCountry;
	}

	public void setIsCountry(Byte isCountry) {
		this.isCountry = isCountry;
	}

	public String getLegalPerson() {
		return legalPerson;
	}

	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}

	public String getControlPerson() {
		return controlPerson;
	}

	public void setControlPerson(String controlPerson) {
		this.controlPerson = controlPerson;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public Integer getRealPayCap() {
		return realPayCap;
	}

	public void setRealPayCap(Integer realPayCap) {
		this.realPayCap = realPayCap;
	}

	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	public String getLoanCardNo() {
		return loanCardNo;
	}

	public void setLoanCardNo(String loanCardNo) {
		this.loanCardNo = loanCardNo;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getNationalTaxRegistration() {
		return nationalTaxRegistration;
	}

	public void setNationalTaxRegistration(String nationalTaxRegistration) {
		this.nationalTaxRegistration = nationalTaxRegistration;
	}

	public String getLocalTaxRegistration() {
		return localTaxRegistration;
	}

	public void setLocalTaxRegistration(String localTaxRegistration) {
		this.localTaxRegistration = localTaxRegistration;
	}

	

	public BigDecimal getRegCap() {
		return regCap;
	}

	public void setRegCap(BigDecimal regCap) {
		this.regCap = regCap;
	}

	public String getRegAddress() {
		return regAddress;
	}

	public void setRegAddress(String regAddress) {
		this.regAddress = regAddress;
	}

	public String getOfficeAddress() {
		return officeAddress;
	}

	public void setOfficeAddress(String officeAddress) {
		this.officeAddress = officeAddress;
	}

	public String getSpecNatural() {
		return specNatural;
	}

	public void setSpecNatural(String specNatural) {
		this.specNatural = specNatural;
	}

	public String getBusiScope() {
		return busiScope;
	}

	public void setBusiScope(String busiScope) {
		this.busiScope = busiScope;
	}

	public String getHistoryEvc() {
		return historyEvc;
	}

	public void setHistoryEvc(String historyEvc) {
		this.historyEvc = historyEvc;
	}

	public String getRelaCorpId() {
		return relaCorpId;
	}

	public void setRelaCorpId(String relaCorpId) {
		this.relaCorpId = relaCorpId;
	}

	public Integer getStaffNum() {
		return staffNum;
	}

	public void setStaffNum(Integer staffNum) {
		this.staffNum = staffNum;
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

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getActivitiKey() {
		return activitiKey;
	}

	public void setActivitiKey(String activitiKey) {
		this.activitiKey = activitiKey;
	}

	public Byte getStatus() {
		return status;
	}

	public void setStatus(Byte status) {
		this.status = status;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public List<?> getContractInfoList() {
		return contractInfoList;
	}

	public void setContractInfoList(List<?> contractInfoList) {
		this.contractInfoList = contractInfoList;
	}

	public String getCompanyUrl() {
		return companyUrl;
	}

	public void setCompanyUrl(String companyUrl) {
		this.companyUrl = companyUrl;
	}

	public String getCompanyPicturePath1() {
		return companyPicturePath1;
	}

	public void setCompanyPicturePath1(String companyPicturePath1) {
		this.companyPicturePath1 = companyPicturePath1;
	}

	public String getCompanyPicturePath2() {
		return companyPicturePath2;
	}

	public void setCompanyPicturePath2(String companyPicturePath2) {
		this.companyPicturePath2 = companyPicturePath2;
	}

	public String getCompanyPicturePath3() {
		return companyPicturePath3;
	}

	public void setCompanyPicturePath3(String companyPicturePath3) {
		this.companyPicturePath3 = companyPicturePath3;
	}

	public String getCompanyPicturePath4() {
		return companyPicturePath4;
	}

	public void setCompanyPicturePath4(String companyPicturePath4) {
		this.companyPicturePath4 = companyPicturePath4;
	}

	public String getCompanyPicturePath5() {
		return companyPicturePath5;
	}

	public void setCompanyPicturePath5(String companyPicturePath5) {
		this.companyPicturePath5 = companyPicturePath5;
	}

	public String getCompanyPicturePath6() {
		return companyPicturePath6;
	}

	public void setCompanyPicturePath6(String companyPicturePath6) {
		this.companyPicturePath6 = companyPicturePath6;
	}

	public String getBusinessRegistrationNumber() {
		return businessRegistrationNumber;
	}

	public void setBusinessRegistrationNumber(String businessRegistrationNumber) {
		this.businessRegistrationNumber = businessRegistrationNumber;
	}

	public String getUniformCreditCode() {
		return uniformCreditCode;
	}

	public void setUniformCreditCode(String uniformCreditCode) {
		this.uniformCreditCode = uniformCreditCode;
	}

	public String getTaxpayerRegistrationNumber() {
		return taxpayerRegistrationNumber;
	}

	public void setTaxpayerRegistrationNumber(String taxpayerRegistrationNumber) {
		this.taxpayerRegistrationNumber = taxpayerRegistrationNumber;
	}

	public String getOperatingPeriod() {
		return operatingPeriod;
	}

	public void setOperatingPeriod(String operatingPeriod) {
		this.operatingPeriod = operatingPeriod;
	}

	public String getLegalIdNumber() {
		return legalIdNumber;
	}

	public void setLegalIdNumber(String legalIdNumber) {
		this.legalIdNumber = legalIdNumber;
	}

	public String getLegalPhoneNumber() {
		return legalPhoneNumber;
	}

	public void setLegalPhoneNumber(String legalPhoneNumber) {
		this.legalPhoneNumber = legalPhoneNumber;
	}

	public String getControlIdNumber() {
		return controlIdNumber;
	}

	public void setControlIdNumber(String controlIdNumber) {
		this.controlIdNumber = controlIdNumber;
	}

	public String getControlPhoneNumber() {
		return controlPhoneNumber;
	}

	public void setControlPhoneNumber(String controlPhoneNumber) {
		this.controlPhoneNumber = controlPhoneNumber;
	}

	public String getFinancePerson() {
		return financePerson;
	}

	public void setFinancePerson(String financePerson) {
		this.financePerson = financePerson;
	}

	public String getFinanceIdNumber() {
		return financeIdNumber;
	}

	public void setFinanceIdNumber(String financeIdNumber) {
		this.financeIdNumber = financeIdNumber;
	}

	public String getFinancePhoneNumber() {
		return financePhoneNumber;
	}

	public void setFinancePhoneNumber(String financePhoneNumber) {
		this.financePhoneNumber = financePhoneNumber;
	}

	public String getMessenger() {
		return messenger;
	}

	public void setMessenger(String messenger) {
		this.messenger = messenger;
	}

	public String getMessengerIdNumber() {
		return messengerIdNumber;
	}

	public void setMessengerIdNumber(String messengerIdNumber) {
		this.messengerIdNumber = messengerIdNumber;
	}

	public String getMessengerPhoneNumber() {
		return messengerPhoneNumber;
	}

	public void setMessengerPhoneNumber(String messengerPhoneNumber) {
		this.messengerPhoneNumber = messengerPhoneNumber;
	}

	public String getBusinessLicensePath() {
		return businessLicensePath;
	}

	public void setBusinessLicensePath(String businessLicensePath) {
		this.businessLicensePath = businessLicensePath;
	}

	public String getPermissionAccountPath() {
		return permissionAccountPath;
	}

	public void setPermissionAccountPath(String permissionAccountPath) {
		this.permissionAccountPath = permissionAccountPath;
	}

	public String getLegalIdNumberPath1() {
		return legalIdNumberPath1;
	}

	public void setLegalIdNumberPath1(String legalIdNumberPath1) {
		this.legalIdNumberPath1 = legalIdNumberPath1;
	}

	public String getLegalIdNumberPath2() {
		return legalIdNumberPath2;
	}

	public void setLegalIdNumberPath2(String legalIdNumberPath2) {
		this.legalIdNumberPath2 = legalIdNumberPath2;
	}

	public BigDecimal getMaxLscreditAmount() {
		return maxLscreditAmount;
	}

	public void setMaxLscreditAmount(BigDecimal maxLscreditAmount) {
		this.maxLscreditAmount = maxLscreditAmount;
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

	
}