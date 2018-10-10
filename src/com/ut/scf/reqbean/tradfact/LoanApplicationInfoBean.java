package com.ut.scf.reqbean.tradfact;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ut.scf.reqbean.ActivitiReqBean;

public class LoanApplicationInfoBean extends ActivitiReqBean {

    private String projectId;
    //合同编号
    private String contractId;
    //合同名称
    private String contractName;
    //保理类型
    private String factType;
    //买方名称
    private String buyerName;
    //卖方名称
    private String sellerName;
    //融资客户
    private String financingCus;
    //可用授信金额
    private BigDecimal availableCredit;
    //放款编号
    private String loanId;
    //保理融资投放金额
    private BigDecimal factFinance;
    //投放日期
    private String loanDate;
    //投放期限
    private int loanPeriod;
    //保理管理费率
    private BigDecimal manageRate;
    //保理管理费金额
    private BigDecimal manageFiance;
    //保证金率
    private BigDecimal depositeRate;
    //保理融资利息率
    private BigDecimal factRate;
    //保理融资利息支付方式
    private String payType;
    //融资收款账号
    private String shroffAccount;
    //户名
    private String accountName;
    //开户行
    private String openBank;
    //联行号
    private String bankNum;

    private String factoringType;


    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public String getContractName() {
        return contractName;
    }

    public void setContractName(String contractName) {
        this.contractName = contractName;
    }

    public String getFactType() {
        return factType;
    }

    public void setFactType(String factType) {
        this.factType = factType;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getFinancingCus() {
        return financingCus;
    }

    public void setFinancingCus(String financingCus) {
        this.financingCus = financingCus;
    }

    public BigDecimal getAvailableCredit() {
        return availableCredit;
    }

    public void setAvailableCredit(BigDecimal availableCredit) {
        this.availableCredit = availableCredit;
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public BigDecimal getFactFinance() {
        return factFinance;
    }

    public void setFactFinance(BigDecimal factFinance) {
        this.factFinance = factFinance;
    }

    public String getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(String loanDate) {
        this.loanDate = loanDate;
    }

    public int getLoanPeriod() {
        return loanPeriod;
    }

    public void setLoanPeriod(int loanPeriod) {
        this.loanPeriod = loanPeriod;
    }

    public BigDecimal getManageRate() {
        return manageRate;
    }

    public void setManageRate(BigDecimal manageRate) {
        this.manageRate = manageRate;
    }

    public BigDecimal getManageFiance() {
        return manageFiance;
    }

    public void setManageFiance(BigDecimal manageFiance) {
        this.manageFiance = manageFiance;
    }

    public BigDecimal getDepositeRate() {
        return depositeRate;
    }

    public void setDepositeRate(BigDecimal depositeRate) {
        this.depositeRate = depositeRate;
    }

    public BigDecimal getFactRate() {
        return factRate;
    }

    public void setFactRate(BigDecimal factRate) {
        this.factRate = factRate;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getShroffAccount() {
        return shroffAccount;
    }

    public void setShroffAccount(String shroffAccount) {
        this.shroffAccount = shroffAccount;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getOpenBank() {
        return openBank;
    }

    public void setOpenBank(String openBank) {
        this.openBank = openBank;
    }

    public String getBankNum() {
        return bankNum;
    }

    public void setBankNum(String bankNum) {
        this.bankNum = bankNum;
    }

    public String getFactoringType() {
        return factoringType;
    }

    public void setFactoringType(String factoringType) {
        this.factoringType = factoringType;
    }


}
