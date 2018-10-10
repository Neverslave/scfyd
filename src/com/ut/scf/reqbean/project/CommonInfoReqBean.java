package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.BaseReqBean;

public class CommonInfoReqBean extends BaseReqBean {

	private String templateType;
	
	private String templateKey;

	public String getTemplateType() {
		return templateType;
	}

	public void setTemplateType(String templateType) {
		this.templateType = templateType;
	}

	public String getTemplateKey() {
		return templateKey;
	}

	public void setTemplateKey(String templateKey) {
		this.templateKey = templateKey;
	}

}
