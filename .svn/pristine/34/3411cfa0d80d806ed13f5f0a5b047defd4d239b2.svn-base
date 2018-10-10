package com.ut.scf.service.statistics.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ExcelUtil2;
import com.ut.scf.dao.statistics.IAgencyInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.statistics.IAgencyInfoService;

@Service("agencyInfoService")
public class AgencyInfoServiceImpl implements IAgencyInfoService {

	@Resource
	private IAgencyInfoDao agencyInfoDao;

	@Override
	public BaseRespBean AgencyInfoList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = agencyInfoDao.getAgencyInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public String exportExcel(Map<String, Object> paramMap, String path) throws Exception {
		List<Map<String, Object>> list = agencyInfoDao.getAgencyInfoList(paramMap);
		// HSSFWorkbook hssfWorkbook = ExcelUtil2.exportToExcel("经销商汇总", getTitles(),
		// getFields(), list, null);
		HSSFWorkbook hssfWorkbook = ExcelUtil2.crateBook();
		HSSFFont font = ExcelUtil2.getFont(hssfWorkbook);
		HSSFCellStyle style = ExcelUtil2.setCell(hssfWorkbook, font);
		HSSFSheet sheet = ExcelUtil2.crateSheet(hssfWorkbook);
		ExcelUtil2.writeTitle("经销商汇总", getTitles(), style, sheet);
		ExcelUtil2.exportToExcel(getFields(), list, null, style, sheet);
		ExcelUtil2.writeExcel(hssfWorkbook, path);
		hssfWorkbook.close();
		return path;
	}

	private List<String> getTitles() {
		List<String> titles = new ArrayList<String>();
		titles.add("经销商名称");
		titles.add("经销商代码");
		titles.add("最高授信额度");
		titles.add("公司地址");
		titles.add("联系方式");
		titles.add("固定电话");
		titles.add("所属区域");
		titles.add("所属商代处");
		return titles;

	}

	private List<String> getFields() {
		List<String> fields = new ArrayList<String>();
		fields.add("corpName");
		fields.add("agencyNum");
		fields.add("useAbleCreditAmt");
		fields.add("officeAddress");
		fields.add("contactInfo");
		fields.add("fixedPhone");
		fields.add("area");
		fields.add("represent");
		return fields;

	}

	@Override
	public BaseRespBean AgencyInfoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = agencyInfoDao.getAgencyInfoList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

}
