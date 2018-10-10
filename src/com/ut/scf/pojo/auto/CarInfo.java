package com.ut.scf.pojo.auto;

import java.math.BigDecimal;
import java.util.Date;

public class CarInfo {

	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.car_frame_num
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private String carFrameNum;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.car_no
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private String carNo;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.finance_id
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private String financeId;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.store_name
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private String storeName;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.pay_date
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private Date payDate;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.car_actual_price
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private BigDecimal carActualPrice;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.car_color
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private String carColor;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.engine_num
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private String engineNum;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database column car_info.sale_status
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	private Byte saleStatus;

	private String revenueDay;
	private String operate;
	
	private String date;
	private String ywlxId;
	
	private String cprYear;
	private String cprMonth;
	private String payId;
	
	
	public String getCprYear() {
		return cprYear;
	}

	public void setCprYear(String cprYear) {
		this.cprYear = cprYear;
	}

	public String getCprMonth() {
		return cprMonth;
	}

	public void setCprMonth(String cprMonth) {
		this.cprMonth = cprMonth;
	}

	public String getPayId() {
		return payId;
	}

	public void setPayId(String payId) {
		this.payId = payId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.car_frame_num
	 * @return  the value of car_info.car_frame_num
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public String getCarFrameNum() {
		return carFrameNum;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.car_frame_num
	 * @param carFrameNum  the value for car_info.car_frame_num
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setCarFrameNum(String carFrameNum) {
		this.carFrameNum = carFrameNum;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.car_no
	 * @return  the value of car_info.car_no
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public String getCarNo() {
		return carNo;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.car_no
	 * @param carNo  the value for car_info.car_no
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.finance_id
	 * @return  the value of car_info.finance_id
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public String getFinanceId() {
		return financeId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.finance_id
	 * @param financeId  the value for car_info.finance_id
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setFinanceId(String financeId) {
		this.financeId = financeId;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.store_name
	 * @return  the value of car_info.store_name
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public String getStoreName() {
		return storeName;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.store_name
	 * @param storeName  the value for car_info.store_name
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.pay_date
	 * @return  the value of car_info.pay_date
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public Date getPayDate() {
		return payDate;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.pay_date
	 * @param payDate  the value for car_info.pay_date
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setPayDate(Date payDate) {
		this.payDate = payDate;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.car_actual_price
	 * @return  the value of car_info.car_actual_price
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public BigDecimal getCarActualPrice() {
		return carActualPrice;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.car_actual_price
	 * @param carActualPrice  the value for car_info.car_actual_price
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setCarActualPrice(BigDecimal carActualPrice) {
		this.carActualPrice = carActualPrice;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.car_color
	 * @return  the value of car_info.car_color
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public String getCarColor() {
		return carColor;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.car_color
	 * @param carColor  the value for car_info.car_color
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setCarColor(String carColor) {
		this.carColor = carColor;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.engine_num
	 * @return  the value of car_info.engine_num
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public String getEngineNum() {
		return engineNum;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.engine_num
	 * @param engineNum  the value for car_info.engine_num
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setEngineNum(String engineNum) {
		this.engineNum = engineNum;
	}

	/**
	 * This method was generated by MyBatis Generator. This method returns the value of the database column car_info.sale_status
	 * @return  the value of car_info.sale_status
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public Byte getSaleStatus() {
		return saleStatus;
	}

	/**
	 * This method was generated by MyBatis Generator. This method sets the value of the database column car_info.sale_status
	 * @param saleStatus  the value for car_info.sale_status
	 * @mbggenerated  Mon Jun 05 16:28:38 CST 2017
	 */
	public void setSaleStatus(Byte saleStatus) {
		this.saleStatus = saleStatus;
	}

	public String getOperate() {
		return operate;
	}

	public void setOperate(String operate) {
		this.operate = operate;
	}

	public String getRevenueDay() {
		return revenueDay;
	}

	public void setRevenueDay(String revenueDay) {
		this.revenueDay = revenueDay;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getYwlxId() {
		return ywlxId;
	}

	public void setYwlxId(String ywlxId) {
		this.ywlxId = ywlxId;
	}
	
}