package com.ut.scf.pojo.auto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class WingPaymentDynamicEarlyInfoExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public WingPaymentDynamicEarlyInfoExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

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

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthIsNull() {
            addCriterion("current_month is null");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthIsNotNull() {
            addCriterion("current_month is not null");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthEqualTo(String value) {
            addCriterion("current_month =", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthNotEqualTo(String value) {
            addCriterion("current_month <>", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthGreaterThan(String value) {
            addCriterion("current_month >", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthGreaterThanOrEqualTo(String value) {
            addCriterion("current_month >=", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthLessThan(String value) {
            addCriterion("current_month <", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthLessThanOrEqualTo(String value) {
            addCriterion("current_month <=", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthLike(String value) {
            addCriterion("current_month like", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthNotLike(String value) {
            addCriterion("current_month not like", value, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthIn(List<String> values) {
            addCriterion("current_month in", values, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthNotIn(List<String> values) {
            addCriterion("current_month not in", values, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthBetween(String value1, String value2) {
            addCriterion("current_month between", value1, value2, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andCurrentMonthNotBetween(String value1, String value2) {
            addCriterion("current_month not between", value1, value2, "currentMonth");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountIsNull() {
            addCriterion("early_repay_month_count is null");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountIsNotNull() {
            addCriterion("early_repay_month_count is not null");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountEqualTo(String value) {
            addCriterion("early_repay_month_count =", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountNotEqualTo(String value) {
            addCriterion("early_repay_month_count <>", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountGreaterThan(String value) {
            addCriterion("early_repay_month_count >", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountGreaterThanOrEqualTo(String value) {
            addCriterion("early_repay_month_count >=", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountLessThan(String value) {
            addCriterion("early_repay_month_count <", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountLessThanOrEqualTo(String value) {
            addCriterion("early_repay_month_count <=", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountLike(String value) {
            addCriterion("early_repay_month_count like", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountNotLike(String value) {
            addCriterion("early_repay_month_count not like", value, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountIn(List<String> values) {
            addCriterion("early_repay_month_count in", values, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountNotIn(List<String> values) {
            addCriterion("early_repay_month_count not in", values, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountBetween(String value1, String value2) {
            addCriterion("early_repay_month_count between", value1, value2, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayMonthCountNotBetween(String value1, String value2) {
            addCriterion("early_repay_month_count not between", value1, value2, "earlyRepayMonthCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountIsNull() {
            addCriterion("early_repay_count is null");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountIsNotNull() {
            addCriterion("early_repay_count is not null");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountEqualTo(Integer value) {
            addCriterion("early_repay_count =", value, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountNotEqualTo(Integer value) {
            addCriterion("early_repay_count <>", value, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountGreaterThan(Integer value) {
            addCriterion("early_repay_count >", value, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountGreaterThanOrEqualTo(Integer value) {
            addCriterion("early_repay_count >=", value, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountLessThan(Integer value) {
            addCriterion("early_repay_count <", value, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountLessThanOrEqualTo(Integer value) {
            addCriterion("early_repay_count <=", value, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountIn(List<Integer> values) {
            addCriterion("early_repay_count in", values, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountNotIn(List<Integer> values) {
            addCriterion("early_repay_count not in", values, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountBetween(Integer value1, Integer value2) {
            addCriterion("early_repay_count between", value1, value2, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayCountNotBetween(Integer value1, Integer value2) {
            addCriterion("early_repay_count not between", value1, value2, "earlyRepayCount");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtIsNull() {
            addCriterion("early_repay_amt is null");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtIsNotNull() {
            addCriterion("early_repay_amt is not null");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtEqualTo(BigDecimal value) {
            addCriterion("early_repay_amt =", value, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtNotEqualTo(BigDecimal value) {
            addCriterion("early_repay_amt <>", value, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtGreaterThan(BigDecimal value) {
            addCriterion("early_repay_amt >", value, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("early_repay_amt >=", value, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtLessThan(BigDecimal value) {
            addCriterion("early_repay_amt <", value, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtLessThanOrEqualTo(BigDecimal value) {
            addCriterion("early_repay_amt <=", value, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtIn(List<BigDecimal> values) {
            addCriterion("early_repay_amt in", values, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtNotIn(List<BigDecimal> values) {
            addCriterion("early_repay_amt not in", values, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("early_repay_amt between", value1, value2, "earlyRepayAmt");
            return (Criteria) this;
        }

        public Criteria andEarlyRepayAmtNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("early_repay_amt not between", value1, value2, "earlyRepayAmt");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

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

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
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
}