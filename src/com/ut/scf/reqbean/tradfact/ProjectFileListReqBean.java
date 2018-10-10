package com.ut.scf.reqbean.tradfact;

import com.ut.scf.reqbean.PageReqBean;

public class ProjectFileListReqBean extends PageReqBean{
	private String projectId;
	
	private String materialClass;

	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getMaterialClass() {
		return materialClass;
	}

	public void setMaterialClass(String materialClass) {
		this.materialClass = materialClass;
	}
	
}
