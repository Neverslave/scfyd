package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.ActivitiReqBean;

import java.util.List;

public class OffsetReqBean extends ActivitiReqBean {
    private String agencyName;
    private String agencyNum;
    /**
     * 还款编号
     */
    private String repaymentNum;
    /**
     * 还款日期
     */
    private String repaymentDate;
    /**
     * 还款金额
     */
    private Double repayAmt;
    /**
     * 还本金金额
     */
    private Double payOrginAmount;
    /**
     * 还息金额
     */
    private Double payInterestAmount;
    /**
     * 融资编号
     */
    private String financeId;
    /**
     * 融资开始日期
     */
    private String financeStartDate;
    /**
     * 融资结束日期
     */
    private String financeEndDate;
    /**
     * 融资金额
     */
    private Double financeAmount;
    /**
     * 付款金额
     */
    private Double payAmt;
    /**
     * 付款余额
     */
    private Double financeBalance;
    /**
     * 实缴保证金金额
     */
    private Double payActGuarantee;

    private Double notPayInterest;

    private Double hasPayInterest;

    private Double guaranteeBalance;
    /**
     * 冲抵差额
     */
    private Double offsetGap;
    /**
     * 销售金额
     */
    private Double salesAmount;
    /**
     * 销售比例
     */
    private Double salesRate;
    /**
     * 购车凭证
     */
    private String carCertificate;
    /**
     * 购车凭证名字
     */
    private String carCertificateName;
    /**
     * 备注
     */
    private String remark;
    /**
     * 表格数据
     */
    private List<?> tableData;
    private String corpId;
    private String userId;
    private String roleId;
    private String activitiKey;

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

    public String getRepaymentNum() {
        return repaymentNum;
    }

    public void setRepaymentNum(String repaymentNum) {
        this.repaymentNum = repaymentNum;
    }

    public String getRepaymentDate() {
        return repaymentDate;
    }

    public void setRepaymentDate(String repaymentDate) {
        this.repaymentDate = repaymentDate;
    }

    public Double getRepayAmt() {
        return repayAmt;
    }

    public void setRepayAmt(Double repayAmt) {
        this.repayAmt = repayAmt;
    }

    public Double getPayOrginAmount() {
        return payOrginAmount;
    }

    public void setPayOrginAmount(Double payOrginAmount) {
        this.payOrginAmount = payOrginAmount;
    }

    public Double getPayInterestAmount() {
        return payInterestAmount;
    }

    public void setPayInterestAmount(Double payInterestAmount) {
        this.payInterestAmount = payInterestAmount;
    }

    public String getFinanceId() {
        return financeId;
    }

    public void setFinanceId(String financeId) {
        this.financeId = financeId;
    }

    public String getFinanceStartDate() {
        return financeStartDate;
    }

    public void setFinanceStartDate(String financeStartDate) {
        this.financeStartDate = financeStartDate;
    }

    public String getFinanceEndDate() {
        return financeEndDate;
    }

    public void setFinanceEndDate(String financeEndDate) {
        this.financeEndDate = financeEndDate;
    }

    public Double getFinanceAmount() {
        return financeAmount;
    }

    public void setFinanceAmount(Double financeAmount) {
        this.financeAmount = financeAmount;
    }

    public Double getPayAmt() {
        return payAmt;
    }

    public void setPayAmt(Double payAmt) {
        this.payAmt = payAmt;
    }

    public Double getFinanceBalance() {
        return financeBalance;
    }

    public void setFinanceBalance(Double financeBalance) {
        this.financeBalance = financeBalance;
    }

    public Double getPayActGuarantee() {
        return payActGuarantee;
    }

    public void setPayActGuarantee(Double payActGuarantee) {
        this.payActGuarantee = payActGuarantee;
    }

    public Double getNotPayInterest() {
        return notPayInterest;
    }

    public void setNotPayInterest(Double notPayInterest) {
        this.notPayInterest = notPayInterest;
    }

    public Double getHasPayInterest() {
        return hasPayInterest;
    }

    public void setHasPayInterest(Double hasPayInterest) {
        this.hasPayInterest = hasPayInterest;
    }

    public Double getGuaranteeBalance() {
        return guaranteeBalance;
    }

    public void setGuaranteeBalance(Double guaranteeBalance) {
        this.guaranteeBalance = guaranteeBalance;
    }

    public Double getOffsetGap() {
        return offsetGap;
    }

    public void setOffsetGap(Double offsetGap) {
        this.offsetGap = offsetGap;
    }

    public Double getSalesAmount() {
        return salesAmount;
    }

    public void setSalesAmount(Double salesAmount) {
        this.salesAmount = salesAmount;
    }

    public Double getSalesRate() {
        return salesRate;
    }

    public void setSalesRate(Double salesRate) {
        this.salesRate = salesRate;
    }

    public String getCarCertificate() {
        return carCertificate;
    }

    public void setCarCertificate(String carCertificate) {
        this.carCertificate = carCertificate;
    }

    public String getCarCertificateName() {
        return carCertificateName;
    }

    public void setCarCertificateName(String carCertificateName) {
        this.carCertificateName = carCertificateName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<?> getTableData() {
        return tableData;
    }

    public void setTableData(List<?> tableData) {
        this.tableData = tableData;
    }

    public String getCorpId() {
        return corpId;
    }

    public void setCorpId(String corpId) {
        this.corpId = corpId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getActivitiKey() {
        return activitiKey;
    }

    public void setActivitiKey(String activitiKey) {
        this.activitiKey = activitiKey;
    }
}
