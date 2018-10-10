package com.ut.scf.reqbean.tradfact;

import com.ut.scf.reqbean.PageReqBean;

public class ContractListBean extends PageReqBean{
		//合同编号
		private String contractId;
		//合同名称
		private String contractName;
		//保理类型
		private String factType;
		//卖方名称
		private String buyerName;
		//卖方名称
		private String sellerName;
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
		
		
}
