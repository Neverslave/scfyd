package com.ut.scf.reqbean.tradfact;

import com.ut.scf.reqbean.PageReqBean;

public class ProjectSignReqBean extends PageReqBean{
	
    private String projecId;
	
	private String projectName;
	
	private String buyName;
	
	private String saleName;
	
	private String factoringType;
	
	public String getProjecId() {
		return projecId;
	}

	public void setProjecId(String projecId) {
		this.projecId = projecId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getBuyName() {
		return buyName;
	}

	public void setBuyName(String buyName) {
		this.buyName = buyName;
	}

	public String getSaleName() {
		return saleName;
	}

	public void setSaleName(String saleName) {
		this.saleName = saleName;
	}

	public String getFactoringType() {
		return factoringType;
	}

	public void setFactoringType(String factoringType) {
		this.factoringType = factoringType;
	}

}
