package com.ut.scf.respbean.tradfact;

import com.ut.scf.respbean.BaseRespBean;

public class RecomMeetingRespBean extends BaseRespBean{
	/**
	 * 项目名称
	 */
	private String projectName;
	/**
	 * 买方名称
	 */
	private String corpBuyName;
	/**
	 * 卖方名称
	 */
	private String corpSaleName;
	/**
	 * 授信主体
	 */
	private String creditMain;
	/**
	 * 保理类型：保理类型（1、有追索权保理； 2、无追索权保理；3、明保理；  4、暗保理；5、正向保理；6、反向保理；7、联合保理； 8、再保理）
	 */
	private String factoringType;
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getCorpBuyName() {
		return corpBuyName;
	}
	public void setCorpBuyName(String corpBuyName) {
		this.corpBuyName = corpBuyName;
	}
	public String getCorpSaleName() {
		return corpSaleName;
	}
	public void setCorpSaleName(String corpSaleName) {
		this.corpSaleName = corpSaleName;
	}
	public String getCreditMain() {
		return creditMain;
	}
	public void setCreditMain(String creditMain) {
		this.creditMain = creditMain;
	}
	public String getFactoringType() {
		return factoringType;
	}
	public void setFactoringType(String factoringType) {
		this.factoringType = factoringType;
	}
	
}
