package com.ut.scf.reqbean.sys;

import com.ut.scf.reqbean.BaseReqBean;

public class MenuListReqBean extends BaseReqBean {

	/**
	 * 角色Id
	 */
	private String roleId;

	private  String parentId;

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
}
