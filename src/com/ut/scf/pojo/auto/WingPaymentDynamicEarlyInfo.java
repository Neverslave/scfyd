package com.ut.scf.pojo.auto;

import java.math.BigDecimal;

public class WingPaymentDynamicEarlyInfo {
    private Integer id;

    private String currentMonth;

    private String earlyRepayMonthCount;

    private Integer earlyRepayCount;

    private BigDecimal earlyRepayAmt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCurrentMonth() {
        return currentMonth;
    }

    public void setCurrentMonth(String currentMonth) {
        this.currentMonth = currentMonth;
    }

    public String getEarlyRepayMonthCount() {
        return earlyRepayMonthCount;
    }

    public void setEarlyRepayMonthCount(String earlyRepayMonthCount) {
        this.earlyRepayMonthCount = earlyRepayMonthCount;
    }

    public Integer getEarlyRepayCount() {
        return earlyRepayCount;
    }

    public void setEarlyRepayCount(Integer earlyRepayCount) {
        this.earlyRepayCount = earlyRepayCount;
    }

    public BigDecimal getEarlyRepayAmt() {
        return earlyRepayAmt;
    }

    public void setEarlyRepayAmt(BigDecimal earlyRepayAmt) {
        this.earlyRepayAmt = earlyRepayAmt;
    }
}