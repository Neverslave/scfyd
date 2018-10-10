package com.ut.scf.reqbean.pub;

import java.math.BigDecimal;

import com.ut.scf.reqbean.PageReqBean;

public class GuaranteeInfoReqBean extends PageReqBean{
		private String financeId;
		
		private String corpId;
		
		private BigDecimal payAbleGuarantee;
		
		private BigDecimal payActGuarantee;
		
		private BigDecimal notPayGuarantee;
		
		private BigDecimal guaranteeBalance;
		
   		private String agencyCorpName;
   		
   		private String agencyOrgnNum;
   		
   		private String guaranteePayStartDate;
   		
   		private String guaranteePayEndDate;
   		/*
   		 * 总计冲抵金额
   		 */
   		private BigDecimal offsetGuarantee;
		
   		public String getFinanceId() {
			return financeId;
		}

		public void setFinanceId(String financeId) {
			this.financeId = financeId;
		}
		

		public String getCorpId() {
			return corpId;
		}

		public void setCorpId(String corpId) {
			this.corpId = corpId;
		}

		public BigDecimal getPayAbleGuarantee() {
			return payAbleGuarantee;
		}

		public void setPayAbleGuarantee(BigDecimal payAbleGuarantee) {
			this.payAbleGuarantee = payAbleGuarantee;
		}

		public BigDecimal getPayActGuarantee() {
			return payActGuarantee;
		}

		public void setPayActGuarantee(BigDecimal payActGuarantee) {
			this.payActGuarantee = payActGuarantee;
		}

		public BigDecimal getNotPayGuarantee() {
			return notPayGuarantee;
		}

		public void setNotPayGuarantee(BigDecimal notPayGuarantee) {
			this.notPayGuarantee = notPayGuarantee;
		}

		public BigDecimal getGuaranteeBalance() {
			return guaranteeBalance;
		}

		public void setGuaranteeBalance(BigDecimal guaranteeBalance) {
			this.guaranteeBalance = guaranteeBalance;
		}

		public String getAgencyCorpName() {
			return agencyCorpName;
		}

		public void setAgencyCorpName(String agencyCorpName) {
			this.agencyCorpName = agencyCorpName;
		}

		public String getAgencyOrgnNum() {
			return agencyOrgnNum;
		}

		public void setAgencyOrgnNum(String agencyOrgnNum) {
			this.agencyOrgnNum = agencyOrgnNum;
		}

		public String getGuaranteePayStartDate() {
			return guaranteePayStartDate;
		}

		public void setGuaranteePayStartDate(String guaranteePayStartDate) {
			this.guaranteePayStartDate = guaranteePayStartDate;
		}

		public String getGuaranteePayEndDate() {
			return guaranteePayEndDate;
		}
		public void setGuaranteePayEndDate(String guaranteePayEndDate) {
			this.guaranteePayEndDate = guaranteePayEndDate;
		}

		public BigDecimal getOffsetGuarantee() {
			return offsetGuarantee;
		}

		public void setOffsetGuarantee(BigDecimal offsetGuarantee) {
			this.offsetGuarantee = offsetGuarantee;
		}

}
