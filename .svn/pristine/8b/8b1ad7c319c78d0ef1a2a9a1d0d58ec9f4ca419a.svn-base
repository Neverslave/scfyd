package com.ut.scf.service.query.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ExcelXLSXUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.OrderAssetsInfoMapper;
import com.ut.scf.dao.query.IOrderAssetsDao;
import com.ut.scf.pojo.auto.OrderAssetsInfo;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.query.IOrderAssetsService;

@Service("orderAssetsService")
public class OrderAssetsServiceImpl implements IOrderAssetsService {
	@Resource
	private IOrderAssetsDao orderAssetsDao;

	@Resource
	private OrderAssetsInfoMapper orderAssetsInfoMapper;
	
	
	
	@Override
	public Map<String, Object> exportExcel(Map<String, Object> paramMap, String path ,String signPath)throws Exception {

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

		paramMap.put("p_state", "0");
		paramMap.put("p_people_type", "3");
		paramMap.put("p_order_begin", paramMap.get("dateBegin"));
		paramMap.put("p_order_date", paramMap.get("dateEnd"));
		paramMap.put("p_order_date_end", paramMap.get("repayEnd"));
		List<Map<String, Object>> repayList = orderAssetsDao.spOrderInfoList(paramMap);

		
	

		Map<String, Object> map=new HashMap<>();
		map.put("orderDateBegin", paramMap.get("dateBegin"));
		map.put("orderDateBegin", paramMap.get("dateEnd").toString());
		map.put("financeDate", paramMap.get("repayEnd"));
		map.put("peopleType", paramMap.get("peopleType"));
		
		map.put("orderCount", repayList.size());

		

		
		XSSFWorkbook XSSFWorkbook = ExcelXLSXUtil.crateBook();
		XSSFFont font = ExcelXLSXUtil.getFont(XSSFWorkbook);
		XSSFCellStyle style = ExcelXLSXUtil.setCell(XSSFWorkbook, font);
		XSSFSheet sheet = ExcelXLSXUtil.crateSheetByName(XSSFWorkbook,"翼支付资产池");

		ExcelXLSXUtil.writeTitle("翼支付资产池", getTitles(), style, sheet);
		ExcelXLSXUtil.exportToExcel(getFields(), repayList, null, style, sheet);

		
		
		ExcelXLSXUtil.writeExcel(XSSFWorkbook, path);
		XSSFWorkbook.close();
		
		
		OrderAssetsInfo orderAssetsInfo=new OrderAssetsInfo();
		orderAssetsInfo.setId(ScfUUID.generate());
		orderAssetsInfo.setpPeopleType(paramMap.get("p_people_type").toString());
		orderAssetsInfo.setpOrderBegin(paramMap.get("p_order_begin").toString());
		orderAssetsInfo.setpOrderDate(paramMap.get("p_order_date").toString());
		orderAssetsInfo.setpOrderDateEnd(paramMap.get("p_order_date_end").toString());
		orderAssetsInfo.setpState("0");
		orderAssetsInfo.setFilePath(signPath);
		orderAssetsInfoMapper.insertSelective(orderAssetsInfo);
		return map;
	}





	private List<String> getTitles() {
		List<String> titles = new ArrayList<String>();

		titles.add("订单号");
		titles.add("订单日期");
		titles.add("分期合约签订城市");
		titles.add("翼支付订单号");
		titles.add("翼支付用户id");
		titles.add("分期超人用户ID");
		titles.add("套餐ID");
		titles.add("套餐名称");
		titles.add("套餐价格");
		titles.add("商品名称");
		titles.add("商品类型");
		titles.add("商品价格");
		titles.add("商品数量");
		titles.add("商品描述");
		titles.add("订单金额");
		titles.add("订单描述");
		titles.add("分期期数");
		titles.add("分期金额");
		titles.add("合约机号码");
		titles.add("IMEI");
		titles.add("运营商");
		titles.add("手机制造商");
		titles.add("手机型号");
		titles.add("操作系统类型");
		titles.add("浏览器类型");
		titles.add("浏览器版本");
		titles.add("安全评分");
		titles.add("网络类型");
		titles.add("内网IP");
		titles.add("营业员手机经度");
		titles.add("营业员手机纬度");
		titles.add("客户经理姓名");
		titles.add("客户经理手机号");
		titles.add("营业厅名称");
		titles.add("营业厅地址");
		titles.add("提货单照片");
		titles.add("合约协议PDFID");
		titles.add("购买手机imei");
		titles.add("订单状态");
		titles.add("电信代理商名称");
		titles.add("代理商所在地区");
		titles.add("保理放款日期");
		titles.add("利率");
		titles.add("个人用户姓名");
		titles.add("用户证件号");
		titles.add("年龄");
		titles.add("学历");
		titles.add("职业");
		titles.add("个人用户所在地区/城市");
		titles.add("个人用户信用评分");
		titles.add("应收账款金额");
		titles.add("融资款本金金额");
		titles.add("营销费本金金额");
		titles.add("翼支付服务费金额");
		titles.add("应收利息或费用金额");
		titles.add("客户已偿还本金金额");
		titles.add("客户已偿还利息或费用金额");
		titles.add("用户未偿还本金金额");
		titles.add("客户未偿还利息金额");
		titles.add("每期还款金额");
		titles.add("每月还款日");
		titles.add("最终还款日");
		titles.add("累计逾期天数");
		titles.add("累计逾期次数");
		titles.add("已还期数");
		titles.add("未还期数");
		titles.add("提前结清");

	
		return titles;
	}





	private List<String> getFields() {
		List<String> fields = new ArrayList<String>();

		fields.add("orderId");
		fields.add("orderDate");
		fields.add("orderCity");
		fields.add("orderIdYi");
		fields.add("userIdYi");
		fields.add("superUserIdYi");
		fields.add("setMealId");
		fields.add("setMealName");
		fields.add("setMealPrice");
		fields.add("goodsName");
		fields.add("goodsType");
		fields.add("goodsPrice");
		fields.add("goodsNum");
		fields.add("goodsDescribe");
		fields.add("orderPrice");
		fields.add("orderDescribe");
		fields.add("financePeriod");
		fields.add("financePrice");
		fields.add("tellNum");
		fields.add("IMEI");
		fields.add("operator");
		fields.add("mobileMaker");
		fields.add("mobileType");
		fields.add("operatingSystem");
		fields.add("browserType");
		fields.add("browserVersion");
		fields.add("safeMark");
		fields.add("networkType");
		fields.add("intranetIp");
		fields.add("salespersonMobileLongitude");
		fields.add("salespersonMobileLatitude");
		fields.add("customerManager");
		fields.add("customerTell");
		fields.add("businessAllName");
		fields.add("businessAllAddress");
		fields.add("billPhotos");
		fields.add("agreementPdf");
		fields.add("moblieImei");
		fields.add("orderStatus");
		fields.add("telecommunicationAgent");
		fields.add("telecommunicationPlace");
		fields.add("dateOfLoan");
		fields.add("rate");
		fields.add("personName");
		fields.add("personId");
		fields.add("personAge");
		fields.add("personEducation");
		fields.add("personOccupation");
		fields.add("personCity");
		fields.add("creditScore");
		fields.add("sumRepaymentMoney");
		fields.add("sumCurrentMoney");
		fields.add("sumMarketingFeeYi");
		fields.add("sumServiceChargeYi");
		fields.add("sumInterestMarkte");
		fields.add("sumPaidPrice");
		fields.add("sumPaidCommission");
		fields.add("sumNotPaidCurrentMoney");
		fields.add("sumNotPaidInterestMoney");
		fields.add("periodPaidprice");
		fields.add("paidDateEach");
		fields.add("paidDateFinal");
		fields.add("yuqiDays");
		fields.add("yuqiTimes");
		fields.add("havPeriod");
		fields.add("notPeriod");
		fields.add("earlyClearance");

		return fields;
	}





	@Override
	public BaseRespBean getFqcrOrderComputeHistoryList(Map<String, Object> paramMap, PageInfoBean page) {

		List<Map<String, Object>> list = orderAssetsDao.getFqcrOrderComputeHistoryList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	
}
