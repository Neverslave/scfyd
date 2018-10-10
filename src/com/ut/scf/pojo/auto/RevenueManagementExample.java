package com.ut.scf.pojo.auto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class RevenueManagementExample {
    /**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	protected String orderByClause;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	protected boolean distinct;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	protected List<Criteria> oredCriteria;

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public RevenueManagementExample() {
		oredCriteria = new ArrayList<Criteria>();
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public String getOrderByClause() {
		return orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public boolean isDistinct() {
		return distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public List<Criteria> getOredCriteria() {
		return oredCriteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public void or(Criteria criteria) {
		oredCriteria.add(criteria);
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public Criteria or() {
		Criteria criteria = createCriteriaInternal();
		oredCriteria.add(criteria);
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public Criteria createCriteria() {
		Criteria criteria = createCriteriaInternal();
		if (oredCriteria.size() == 0) {
			oredCriteria.add(criteria);
		}
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	protected Criteria createCriteriaInternal() {
		Criteria criteria = new Criteria();
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public void clear() {
		oredCriteria.clear();
		orderByClause = null;
		distinct = false;
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	protected abstract static class GeneratedCriteria {
		protected List<Criterion> criteria;

		protected GeneratedCriteria() {
			super();
			criteria = new ArrayList<Criterion>();
		}

		public boolean isValid() {
			return criteria.size() > 0;
		}

		public List<Criterion> getAllCriteria() {
			return criteria;
		}

		public List<Criterion> getCriteria() {
			return criteria;
		}

		protected void addCriterion(String condition) {
			if (condition == null) {
				throw new RuntimeException("Value for condition cannot be null");
			}
			criteria.add(new Criterion(condition));
		}

		protected void addCriterion(String condition, Object value,
				String property) {
			if (value == null) {
				throw new RuntimeException("Value for " + property
						+ " cannot be null");
			}
			criteria.add(new Criterion(condition, value));
		}

		protected void addCriterion(String condition, Object value1,
				Object value2, String property) {
			if (value1 == null || value2 == null) {
				throw new RuntimeException("Between values for " + property
						+ " cannot be null");
			}
			criteria.add(new Criterion(condition, value1, value2));
		}

		protected void addCriterionForJDBCDate(String condition, Date value,
				String property) {
			if (value == null) {
				throw new RuntimeException("Value for " + property
						+ " cannot be null");
			}
			addCriterion(condition, new java.sql.Date(value.getTime()),
					property);
		}

		protected void addCriterionForJDBCDate(String condition,
				List<Date> values, String property) {
			if (values == null || values.size() == 0) {
				throw new RuntimeException("Value list for " + property
						+ " cannot be null or empty");
			}
			List<java.sql.Date> dateList = new ArrayList<java.sql.Date>();
			Iterator<Date> iter = values.iterator();
			while (iter.hasNext()) {
				dateList.add(new java.sql.Date(iter.next().getTime()));
			}
			addCriterion(condition, dateList, property);
		}

		protected void addCriterionForJDBCDate(String condition, Date value1,
				Date value2, String property) {
			if (value1 == null || value2 == null) {
				throw new RuntimeException("Between values for " + property
						+ " cannot be null");
			}
			addCriterion(condition, new java.sql.Date(value1.getTime()),
					new java.sql.Date(value2.getTime()), property);
		}

		public Criteria andFinanceIdIsNull() {
			addCriterion("finance_id is null");
			return (Criteria) this;
		}

		public Criteria andFinanceIdIsNotNull() {
			addCriterion("finance_id is not null");
			return (Criteria) this;
		}

		public Criteria andFinanceIdEqualTo(String value) {
			addCriterion("finance_id =", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotEqualTo(String value) {
			addCriterion("finance_id <>", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdGreaterThan(String value) {
			addCriterion("finance_id >", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdGreaterThanOrEqualTo(String value) {
			addCriterion("finance_id >=", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdLessThan(String value) {
			addCriterion("finance_id <", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdLessThanOrEqualTo(String value) {
			addCriterion("finance_id <=", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdLike(String value) {
			addCriterion("finance_id like", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotLike(String value) {
			addCriterion("finance_id not like", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdIn(List<String> values) {
			addCriterion("finance_id in", values, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotIn(List<String> values) {
			addCriterion("finance_id not in", values, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdBetween(String value1, String value2) {
			addCriterion("finance_id between", value1, value2, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotBetween(String value1, String value2) {
			addCriterion("finance_id not between", value1, value2, "financeId");
			return (Criteria) this;
		}

		public Criteria andThisInterestIsNull() {
			addCriterion("this_interest is null");
			return (Criteria) this;
		}

		public Criteria andThisInterestIsNotNull() {
			addCriterion("this_interest is not null");
			return (Criteria) this;
		}

		public Criteria andThisInterestEqualTo(BigDecimal value) {
			addCriterion("this_interest =", value, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestNotEqualTo(BigDecimal value) {
			addCriterion("this_interest <>", value, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestGreaterThan(BigDecimal value) {
			addCriterion("this_interest >", value, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestGreaterThanOrEqualTo(BigDecimal value) {
			addCriterion("this_interest >=", value, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestLessThan(BigDecimal value) {
			addCriterion("this_interest <", value, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestLessThanOrEqualTo(BigDecimal value) {
			addCriterion("this_interest <=", value, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestIn(List<BigDecimal> values) {
			addCriterion("this_interest in", values, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestNotIn(List<BigDecimal> values) {
			addCriterion("this_interest not in", values, "thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("this_interest between", value1, value2,
					"thisInterest");
			return (Criteria) this;
		}

		public Criteria andThisInterestNotBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("this_interest not between", value1, value2,
					"thisInterest");
			return (Criteria) this;
		}

		public Criteria andInterestSumIsNull() {
			addCriterion("interest_sum is null");
			return (Criteria) this;
		}

		public Criteria andInterestSumIsNotNull() {
			addCriterion("interest_sum is not null");
			return (Criteria) this;
		}

		public Criteria andInterestSumEqualTo(BigDecimal value) {
			addCriterion("interest_sum =", value, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumNotEqualTo(BigDecimal value) {
			addCriterion("interest_sum <>", value, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumGreaterThan(BigDecimal value) {
			addCriterion("interest_sum >", value, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumGreaterThanOrEqualTo(BigDecimal value) {
			addCriterion("interest_sum >=", value, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumLessThan(BigDecimal value) {
			addCriterion("interest_sum <", value, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumLessThanOrEqualTo(BigDecimal value) {
			addCriterion("interest_sum <=", value, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumIn(List<BigDecimal> values) {
			addCriterion("interest_sum in", values, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumNotIn(List<BigDecimal> values) {
			addCriterion("interest_sum not in", values, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("interest_sum between", value1, value2, "interestSum");
			return (Criteria) this;
		}

		public Criteria andInterestSumNotBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("interest_sum not between", value1, value2,
					"interestSum");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestIsNull() {
			addCriterion("has_pay_interest is null");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestIsNotNull() {
			addCriterion("has_pay_interest is not null");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestEqualTo(BigDecimal value) {
			addCriterion("has_pay_interest =", value, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestNotEqualTo(BigDecimal value) {
			addCriterion("has_pay_interest <>", value, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestGreaterThan(BigDecimal value) {
			addCriterion("has_pay_interest >", value, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestGreaterThanOrEqualTo(BigDecimal value) {
			addCriterion("has_pay_interest >=", value, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestLessThan(BigDecimal value) {
			addCriterion("has_pay_interest <", value, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestLessThanOrEqualTo(BigDecimal value) {
			addCriterion("has_pay_interest <=", value, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestIn(List<BigDecimal> values) {
			addCriterion("has_pay_interest in", values, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestNotIn(List<BigDecimal> values) {
			addCriterion("has_pay_interest not in", values, "hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("has_pay_interest between", value1, value2,
					"hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andHasPayInterestNotBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("has_pay_interest not between", value1, value2,
					"hasPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestIsNull() {
			addCriterion("not_pay_interest is null");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestIsNotNull() {
			addCriterion("not_pay_interest is not null");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestEqualTo(BigDecimal value) {
			addCriterion("not_pay_interest =", value, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestNotEqualTo(BigDecimal value) {
			addCriterion("not_pay_interest <>", value, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestGreaterThan(BigDecimal value) {
			addCriterion("not_pay_interest >", value, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestGreaterThanOrEqualTo(BigDecimal value) {
			addCriterion("not_pay_interest >=", value, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestLessThan(BigDecimal value) {
			addCriterion("not_pay_interest <", value, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestLessThanOrEqualTo(BigDecimal value) {
			addCriterion("not_pay_interest <=", value, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestIn(List<BigDecimal> values) {
			addCriterion("not_pay_interest in", values, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestNotIn(List<BigDecimal> values) {
			addCriterion("not_pay_interest not in", values, "notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("not_pay_interest between", value1, value2,
					"notPayInterest");
			return (Criteria) this;
		}

		public Criteria andNotPayInterestNotBetween(BigDecimal value1,
				BigDecimal value2) {
			addCriterion("not_pay_interest not between", value1, value2,
					"notPayInterest");
			return (Criteria) this;
		}

		public Criteria andLastCalDateIsNull() {
			addCriterion("last_cal_date is null");
			return (Criteria) this;
		}

		public Criteria andLastCalDateIsNotNull() {
			addCriterion("last_cal_date is not null");
			return (Criteria) this;
		}

		public Criteria andLastCalDateEqualTo(Date value) {
			addCriterionForJDBCDate("last_cal_date =", value, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateNotEqualTo(Date value) {
			addCriterionForJDBCDate("last_cal_date <>", value, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateGreaterThan(Date value) {
			addCriterionForJDBCDate("last_cal_date >", value, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateGreaterThanOrEqualTo(Date value) {
			addCriterionForJDBCDate("last_cal_date >=", value, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateLessThan(Date value) {
			addCriterionForJDBCDate("last_cal_date <", value, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateLessThanOrEqualTo(Date value) {
			addCriterionForJDBCDate("last_cal_date <=", value, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateIn(List<Date> values) {
			addCriterionForJDBCDate("last_cal_date in", values, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateNotIn(List<Date> values) {
			addCriterionForJDBCDate("last_cal_date not in", values,
					"lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateBetween(Date value1, Date value2) {
			addCriterionForJDBCDate("last_cal_date between", value1, value2,
					"lastCalDate");
			return (Criteria) this;
		}

		public Criteria andLastCalDateNotBetween(Date value1, Date value2) {
			addCriterionForJDBCDate("last_cal_date not between", value1,
					value2, "lastCalDate");
			return (Criteria) this;
		}

		public Criteria andCreateTimeIsNull() {
			addCriterion("create_time is null");
			return (Criteria) this;
		}

		public Criteria andCreateTimeIsNotNull() {
			addCriterion("create_time is not null");
			return (Criteria) this;
		}

		public Criteria andCreateTimeEqualTo(Date value) {
			addCriterion("create_time =", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeNotEqualTo(Date value) {
			addCriterion("create_time <>", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeGreaterThan(Date value) {
			addCriterion("create_time >", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
			addCriterion("create_time >=", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeLessThan(Date value) {
			addCriterion("create_time <", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
			addCriterion("create_time <=", value, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeIn(List<Date> values) {
			addCriterion("create_time in", values, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeNotIn(List<Date> values) {
			addCriterion("create_time not in", values, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeBetween(Date value1, Date value2) {
			addCriterion("create_time between", value1, value2, "createTime");
			return (Criteria) this;
		}

		public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
			addCriterion("create_time not between", value1, value2,
					"createTime");
			return (Criteria) this;
		}
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table revenue_management
	 * @mbggenerated  Fri Jun 09 14:58:13 CST 2017
	 */
	public static class Criterion {
		private String condition;
		private Object value;
		private Object secondValue;
		private boolean noValue;
		private boolean singleValue;
		private boolean betweenValue;
		private boolean listValue;
		private String typeHandler;

		public String getCondition() {
			return condition;
		}

		public Object getValue() {
			return value;
		}

		public Object getSecondValue() {
			return secondValue;
		}

		public boolean isNoValue() {
			return noValue;
		}

		public boolean isSingleValue() {
			return singleValue;
		}

		public boolean isBetweenValue() {
			return betweenValue;
		}

		public boolean isListValue() {
			return listValue;
		}

		public String getTypeHandler() {
			return typeHandler;
		}

		protected Criterion(String condition) {
			super();
			this.condition = condition;
			this.typeHandler = null;
			this.noValue = true;
		}

		protected Criterion(String condition, Object value, String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.typeHandler = typeHandler;
			if (value instanceof List<?>) {
				this.listValue = true;
			} else {
				this.singleValue = true;
			}
		}

		protected Criterion(String condition, Object value) {
			this(condition, value, null);
		}

		protected Criterion(String condition, Object value, Object secondValue,
				String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.secondValue = secondValue;
			this.typeHandler = typeHandler;
			this.betweenValue = true;
		}

		protected Criterion(String condition, Object value, Object secondValue) {
			this(condition, value, secondValue, null);
		}
	}

	/**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table revenue_management
     *
     * @mbggenerated do_not_delete_during_merge Thu Jun 01 20:42:29 CST 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }
}