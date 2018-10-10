package com.ut.scf.service.query.impl;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.util.StringUtil;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.mysql.jdbc.StringUtils;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ExcelXLSXUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.FqcrFinanceRepayHisotoryMapper;
import com.ut.scf.dao.query.IFinanceRepayDao;
import com.ut.scf.pojo.auto.FqcrFinanceRepayHisotory;
import com.ut.scf.pojo.auto.FqcrFinanceRepayHisotoryExample;
import com.ut.scf.pojo.auto.FqcrFinanceRepayHisotoryExample.Criteria;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IFinanceRepayService;

@Service("finaceRepayService")
public class FinanceRepayServiceImpl implements IFinanceRepayService {
	@Resource
	private IFinanceRepayDao financeRepayDao;
	@Resource
	private FqcrFinanceRepayHisotoryMapper fqcrFinanceRepayHisotoryMapper;
	@Override 
	public BaseRespBean getFqcrFinaceRepayHistoryList(Map<String, Object> paramMap,PageInfoBean page){
		
		List<Map<String, Object>> list = financeRepayDao.getFqcrFinaceRepayHistoryList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	@Override 
	public BaseRespBean getLastFinanceDate(String peopleType){
		
		String maxDate = financeRepayDao.getLastFinanceDate(peopleType);
		BaseRespBean respBean =new BaseRespBean();
		respBean.setResultNote(StringUtils.isNullOrEmpty(maxDate)?"2018-05-01":maxDate);
		return respBean;
	}
	
	
	
	@Override
	public Map<String, Object> exportExcel(Map<String, Object> paramMap, String path) throws Exception {

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<Map<String, Object>> tiqianList = financeRepayDao.fqcrYIFTiqianjqOrderList(paramMap);
		List<Map<String, Object>> repayList = financeRepayDao.fqcrYIFZCJSRepayList(paramMap);

		
		BigDecimal tqsumCurrentMoney= new BigDecimal(0.00);
		BigDecimal tqsumInterest= new BigDecimal(0.00);
		BigDecimal tqsumMarketingFeeYi= new BigDecimal(0.00);
		
		BigDecimal sumCurrentMoney= new BigDecimal(0.00);
		BigDecimal sumInterest= new BigDecimal(0.00);
		BigDecimal sumMarketingFeeYi= new BigDecimal(0.00);
		for (Map<String, Object> map : tiqianList) {
			tqsumMarketingFeeYi=tqsumMarketingFeeYi.add(new BigDecimal(map.get("restMarketingFeeYi").toString()) );
			tqsumInterest=tqsumInterest.add(new BigDecimal(map.get("restInterest").toString()))  ;
			tqsumCurrentMoney=tqsumCurrentMoney.add(new BigDecimal(map.get("restCurrentMoney").toString())) ;
		}
		
		for (Map<String, Object> map : repayList) {
			sumMarketingFeeYi=sumMarketingFeeYi.add(new BigDecimal(map.get("marketingFeeYi").toString()) );
			sumCurrentMoney=sumCurrentMoney.add(new BigDecimal(map.get("currentMoney").toString()) );
			sumInterest=sumInterest.add(new BigDecimal(map.get("interest").toString()) );
		}
		
		Date dateEnd = dateFormat.parse(paramMap.get("dateEnd").toString());
		Calendar ca = Calendar.getInstance(); 
		ca.setTime(dateEnd);
		ca.add(ca.DATE, -1);
		dateEnd=ca.getTime();
		
		
		List<Map<String, Object>> huizongList=new 	ArrayList<Map<String, Object>> ();
		Map<String, Object> map=new HashMap<>();
		map.put("financeDateBegin", paramMap.get("dateBegin"));
		map.put("financeDateEnd", dateFormat.format(dateEnd));
		map.put("financeDate", paramMap.get("dateEnd"));
		map.put("peopleType", paramMap.get("peopleType"));
		
		map.put("tiRepayCount", tiqianList.size());
		map.put("tiRestCurrentMoney", tqsumCurrentMoney);
		map.put("tiRestInterest", tqsumInterest);
		map.put("tiRestMarketingFeeYi", tqsumMarketingFeeYi);
		map.put("repayCount", repayList.size());
		map.put("repayInterest", sumInterest);
		map.put("repayCurrentMoney", sumCurrentMoney);
		map.put("repayMarketingFeeYi", sumMarketingFeeYi);
		
		huizongList.add(map);
		
		XSSFWorkbook XSSFWorkbook = ExcelXLSXUtil.crateBook();
		XSSFFont font = ExcelXLSXUtil.getFont(XSSFWorkbook);
		XSSFCellStyle style = ExcelXLSXUtil.setCell(XSSFWorkbook, font);
		XSSFSheet sheet = ExcelXLSXUtil.crateSheetByName(XSSFWorkbook,"提前结清数据");
		XSSFSheet sheet2 = ExcelXLSXUtil.crateSheetByName(XSSFWorkbook,"应收账款数据");
		XSSFSheet sheet3 = ExcelXLSXUtil.crateSheetByName(XSSFWorkbook,"汇总");
		ExcelXLSXUtil.writeTitle("提前结清数据", getTiQianTitles(), style, sheet);
		ExcelXLSXUtil.exportToExcel(getTiQianFields(), tiqianList, null, style, sheet);
		ExcelXLSXUtil.writeTitle("应收账款数据", getTitles(), style, sheet2);
		ExcelXLSXUtil.exportToExcel(getFields(), repayList, null, style, sheet2);
		
		ExcelXLSXUtil.writeTitle("汇总数据", getSumTitles(), style, sheet3);
		ExcelXLSXUtil.exportToExcel(getSumFields(), huizongList, null, style, sheet3);
		
		ExcelXLSXUtil.writeExcel(XSSFWorkbook, path);
		XSSFWorkbook.close();
		
		return map;
	}

	
	@Override
	public Map<String, Object> exportJtkdExcel(Map<String, Object> paramMap, String path) throws Exception {

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		List<Map<String, Object>> repayList = financeRepayDao.getfqcrJtkdFinanceRepay(paramMap);
		List<Map<String, Object>> repaySum = financeRepayDao.getfqcrSumJtkdFinanceRepay(paramMap);
		
		
		Date dateEnd = dateFormat.parse(paramMap.get("dateEnd").toString());
		Calendar ca = Calendar.getInstance(); 
		ca.setTime(dateEnd);
		ca.add(ca.DATE, -1);
		dateEnd=ca.getTime();		
		List<Map<String, Object>> huizongList=new 	ArrayList<Map<String, Object>> ();
		Map<String, Object> map=new HashMap<>();
		map.put("financeDateBegin", paramMap.get("dateBegin"));
		map.put("financeDateEnd", dateFormat.format(dateEnd));
		map.put("financeDate", paramMap.get("dateEnd"));
		map.put("peopleType", paramMap.get("peopleType"));		

		map.put("repayCount", repaySum.get(0).get("sumCount"));
		map.put("repayInterest", repaySum.get(0).get("sumInterest"));
		map.put("repayCurrentMoney", repaySum.get(0).get("sumCurrentMoney"));		
		huizongList.add(map);		
		XSSFWorkbook XSSFWorkbook = ExcelXLSXUtil.crateBook();
		XSSFFont font = ExcelXLSXUtil.getFont(XSSFWorkbook);
		XSSFCellStyle style = ExcelXLSXUtil.setCell(XSSFWorkbook, font);
		XSSFSheet sheet2 = ExcelXLSXUtil.crateSheetByName(XSSFWorkbook,"应收账款数据");
		XSSFSheet sheet3 = ExcelXLSXUtil.crateSheetByName(XSSFWorkbook,"汇总");
		ExcelXLSXUtil.writeTitle("应收账款数据", getJtkdTitles(), style, sheet2);
		ExcelXLSXUtil.exportToExcel(getJtkdFields(), repayList, null, style, sheet2);		
		ExcelXLSXUtil.writeTitle("汇总数据", getJtkdSumTitles(), style, sheet3);
		ExcelXLSXUtil.exportToExcel(getJtkdSumFields(), huizongList, null, style, sheet3);
		
		ExcelXLSXUtil.writeExcel(XSSFWorkbook, path);
		XSSFWorkbook.close();
		
		return map;
	}
	
	
	
	
	
	private List<String> getTiQianTitles() {
		List<String> titles = new ArrayList<String>();

		titles.add("批次号");
		titles.add("订单号");
		titles.add("翼支付订单号");
		titles.add("商品名称");
		titles.add("总还款期数");
		titles.add("投放金额");
		titles.add("结清期数");
		titles.add("剩余本金金额");
		titles.add("剩余利息金额（一期）");
		titles.add("剩余营销费金额");
	
		return titles;

	}

	private List<String> getJtkdFields() {
		List<String> fields = new ArrayList<String>();

		fields.add("batchId");
		fields.add("orderId");
		fields.add("period");
		fields.add("currentRepayDate");
		fields.add("interest");
		fields.add("currentMoney");

		return fields;

	}
	
	private List<String> getJtkdTitles() {
		List<String> titles = new ArrayList<String>();
		titles.add("批次号");
		titles.add("订单号");
		titles.add("期数");
		titles.add("应还日期");
		titles.add("应还本金");
		titles.add("应还利息");
		
		return titles;
	}
	private List<String> getFields() {
		List<String> fields = new ArrayList<String>();

		fields.add("batchId");
		fields.add("orderId");
		fields.add("loanTenor");
		fields.add("repaymentDate");
		fields.add("interest");
		fields.add("currentMoney");
		fields.add("marketingFeeYi");
		return fields;

	}
	
	private List<String> getTitles() {
		List<String> titles = new ArrayList<String>();
		titles.add("批次号");
		titles.add("订单号");
		titles.add("期数");
		titles.add("应还日期");
		titles.add("应还利息");
		titles.add("应还本金");
		titles.add("应还营销费");
		return titles;
	}

	private List<String> getTiQianFields() {
		List<String> fields = new ArrayList<String>();
		fields.add("batchId");
		fields.add("orderId");
		fields.add("orderIdYi");
		fields.add("goodsName");
		fields.add("financePeriod");
		fields.add("needmoney");
		fields.add("totalCount");
		fields.add("restCurrentMoney");
		fields.add("restInterest");
		fields.add("restMarketingFeeYi");
		return fields;
	}
	private List<String> getJtkdSumTitles() {
		List<String> titles = new ArrayList<String>();
		titles.add("应收账款数量：");
		titles.add("应收账款本金总额（正常）：");
		titles.add("应收账款利息总额（正常）：");

		return titles;
	}

	private List<String> getJtkdSumFields() {
		List<String> fields = new ArrayList<String>();
		fields.add("repayCount");
		fields.add("repayCurrentMoney");
		fields.add("repayInterest");

		return fields;
	}
	
	
	private List<String> getSumTitles() {
		List<String> titles = new ArrayList<String>();
		titles.add("应收账款数量（正常）：");
		titles.add("应收账款本金总额（正常）：");
		titles.add("应收账款利息总额（正常）：");
		titles.add("应收账款营销费总额（正常）：");
		
		titles.add("提前还款数量：");
		titles.add("提前还款剩余本金：");
		titles.add("提前还款应收利息（一期）：");
		titles.add("提前还款剩余营销费：");
		return titles;
	}

	private List<String> getSumFields() {
		List<String> fields = new ArrayList<String>();
		fields.add("repayCount");
		fields.add("repayCurrentMoney");
		fields.add("repayInterest");
		fields.add("repayMarketingFeeYi");
		
		fields.add("tiRepayCount");
		fields.add("tiRestCurrentMoney");
		fields.add("tiRestInterest");
		fields.add("tiRestMarketingFeeYi");

		return fields;
	}





	@Override
	public BaseRespBean saveFinanceFun(FqcrFinanceRepayHisotory reqBean) throws Exception {
		BaseRespBean respBean=new BaseRespBean();
		reqBean.setId(ScfUUID.generate());
		int i=fqcrFinanceRepayHisotoryMapper.insertSelective(reqBean);
		if(i==0){
			respBean.setResult(-1);
		}
		return respBean;
	}




	@Override
	public BaseRespBean confirmFinanceFun(FqcrFinanceRepayHisotory reqBean) throws Exception {
		BaseRespBean respBean=new BaseRespBean();
		FqcrFinanceRepayHisotoryExample example=new FqcrFinanceRepayHisotoryExample();
		
		Criteria criteria =example.createCriteria();
		criteria.andFinanceDateEqualTo(reqBean.getFinanceDate());
		criteria.andPeopleTypeEqualTo(reqBean.getPeopleType());
		
		int i=fqcrFinanceRepayHisotoryMapper.updateByExampleSelective(reqBean, example);
		if(i==0){
			respBean.setResult(-1);
		}
		return respBean;
	}




	@Override
	public BaseRespBean deleteFinanceFun(FqcrFinanceRepayHisotory reqBean) throws Exception {
		BaseRespBean respBean=new BaseRespBean();
		FqcrFinanceRepayHisotoryExample example=new FqcrFinanceRepayHisotoryExample();
		Criteria criteria =example.createCriteria();
		criteria.andFinanceDateEqualTo(reqBean.getFinanceDate());
		criteria.andPeopleTypeEqualTo(reqBean.getPeopleType());
		int i=fqcrFinanceRepayHisotoryMapper.deleteByExample(example);
		if(i==0){
			respBean.setResult(-1);
		}
		return respBean;
	}
	
}
