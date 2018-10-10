package com.ut.scf.service.query.impl;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.ut.scf.dao.query.IInterestInfoDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IInterestInfoQueryService;

@Service("interestInfoQueryService")
public class InterestInfoQueryServiceImpl implements IInterestInfoQueryService {

	@Resource
	private IInterestInfoDao iInterestInfoDao;

	@Override
	public BaseRespBean interestQueryList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = iInterestInfoDao.getInterestInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public void exportExcel(Map<String, Object> paramMap, String path) throws Exception {
		String corpId = "";
		String title = "";
		if (paramMap.containsKey("corpId")) {
			corpId = String.valueOf(paramMap.get("corpId"));
		}
		if ("".equals(corpId)) {
			title = "利息查询（悦达dyk查看）";
		} else {
			title = "利息查询（经销商查看）";
		}
		List<Map<String, Object>> list = iInterestInfoDao.getInterestExpInfo(paramMap);

		HSSFWorkbook hssfWorkbook = ExcelUtil2.crateBook();
		HSSFFont font = ExcelUtil2.getFont(hssfWorkbook);
		HSSFCellStyle style = ExcelUtil2.setCell(hssfWorkbook, font);
		HSSFSheet sheet = ExcelUtil2.crateSheet(hssfWorkbook);
		ExcelUtil2.writeTitle(title, getTitles(corpId), style, sheet);
		ExcelUtil2.exportToExcel(getFields(corpId), list, getMergeMap(corpId), style, sheet);
		ExcelUtil2.writeExcel(hssfWorkbook, path);
		hssfWorkbook.close();

	}

	private Map<String, String> getMergeMap(String corpId) {
		Map<String, String> mergeMap = new HashMap<String, String>();
		if ("".equals(corpId)) {
			mergeMap.put("agencyNum", "agencyNum");
			mergeMap.put("corpName", "agencyNum");
		}
		mergeMap.put("payId", "payId");
		mergeMap.put("payAmt", "payId");
		mergeMap.put("financeStartDate", "payId");
		mergeMap.put("financeEndDate", "payId");
		mergeMap.put("financeBalance", "payId");
		mergeMap.put("counts", "payId");
		mergeMap.put("interestSum", "payId");
		return mergeMap;
	}

	private List<String> getTitles(String corpId) {
		List<String> titles = new ArrayList<String>();
		if ("".equals(corpId)) {
			titles.add("经销商代码");
			titles.add("经销商名称");
		}
		titles.add("付款承诺函编号");
		titles.add("付款承诺函金额");
		titles.add("付款承诺函起始日");
		titles.add("付款承诺函到期日");
		titles.add("未销售金额");
		titles.add("未销售车辆数量");
		titles.add("合计利息");
		titles.add("车架号");
		titles.add("实际提车价");
		return titles;

	}

	private List<String> getFields(String corpId) {
		List<String> fields = new ArrayList<String>();
		if ("".equals(corpId)) {
			fields.add("agencyNum");
			fields.add("corpName");
		}
		fields.add("payId");
		fields.add("payAmt");
		fields.add("financeStartDate");
		fields.add("financeEndDate");
		fields.add("financeBalance");
		fields.add("counts");
		fields.add("interestSum");
		fields.add("carFrameNum");
		fields.add("carActualPrice");
		return fields;

	}

	@Override
	public BaseRespBean getInterestInfoList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = iInterestInfoDao.getInterestInfoList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}
}
