package com.ut.scf.respbean.project;

import java.util.List;

import com.ut.scf.respbean.PageRespBean;

public class CountRespBean extends PageRespBean {
	/**
	 * 表格集合
	 */
	private List<?> tableList;
	/**
	 * 图表
	 */
	private List<?> echartList;
	public List<?> getTableList() {
		return tableList;
	}
	public void setTableList(List<?> tableList) {
		this.tableList = tableList;
	}
	public List<?> getEchartList() {
		return echartList;
	}
	public void setEchartList(List<?> echartList) {
		this.echartList = echartList;
	}
	
}
