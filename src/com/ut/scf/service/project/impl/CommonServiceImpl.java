package com.ut.scf.service.project.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CommitmentLetterInfoMapper;
import com.ut.scf.dao.auto.InterestManagementMapper;
import com.ut.scf.dao.auto.WarningInfoMapper;
import com.ut.scf.dao.sys.IWarningDao;
import com.ut.scf.pojo.auto.CommitmentLetterInfoExample;
import com.ut.scf.pojo.auto.InterestManagement;
import com.ut.scf.pojo.auto.InterestManagementExample;
import com.ut.scf.pojo.auto.InterestManagementExample.Criteria;
import com.ut.scf.pojo.auto.WarningInfo;
import com.ut.scf.reqbean.project.CommonInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.project.ICommonService;

@Service("commonService")
public class CommonServiceImpl implements ICommonService {

	private static String STR_DD = "dd";

	private static String STR_MMDD = "MMdd";

	private static SimpleDateFormat DATE_FORMAT_DD = new SimpleDateFormat(STR_DD);

	private static SimpleDateFormat DATE_FORMAT_MMDD = new SimpleDateFormat(STR_MMDD);

	@Resource
	private InterestManagementMapper interestManagementMapper;

	@Resource
	private IWarningDao warningDao;

	@Resource
	private WarningInfoMapper warningInfoMapper;

	@Resource
	private CommitmentLetterInfoMapper letterInfoMapper;

	@Override
	public boolean isInterestDate(Date date, String productId) {

		// 收息日取得
		InterestManagementExample interestManagementExample = new InterestManagementExample();
		Criteria criteria = interestManagementExample.createCriteria();
		criteria.andProductIdEqualTo(productId);
		List<InterestManagement> interestManagementList = interestManagementMapper.selectByExample(interestManagementExample);
		if (CollectionUtils.isNotEmpty(interestManagementList)) {
			byte bett = interestManagementList.get(0).getBett();// 扣息方式
			String receptionDate = interestManagementList.get(0).getReceptionDate();// 收息日
			if (StringUtils.isNotEmpty(receptionDate)) {
				receptionDate = String.format("%02d", Integer.parseInt(receptionDate));
			}

			if (bett == 0) {// 按季结息
				String mmdd = DATE_FORMAT_MMDD.format(date);
				if (mmdd.equals("03" + receptionDate) || mmdd.equals("06" + receptionDate) || mmdd.equals("09" + receptionDate)
				        || mmdd.equals("12" + receptionDate)) {
					return true;
				}
			} else if (bett == 1) {// 按月结息
				if (receptionDate.equals(DATE_FORMAT_DD.format(date))) {
					return true;
				}
			}
		}

		return false;
	}

	@Override
	public void insertWarningInfo(Map<String, Object> paramMap) {

		// 推送对象用户取得
		List<String> userList = warningDao.selectWarningUser(paramMap);

		// 预警通知
		WarningInfo warningInfo = new WarningInfo();
		warningInfo.setWarnType(((Integer) paramMap.get("warnType")).byteValue());
		warningInfo.setSendTime(new Date());
		warningInfo.setWarnStatus((byte) 0);
		warningInfo.setWarnMsg((String) paramMap.get("warnMsg"));
		if (paramMap.get("filePath") != null) {
			warningInfo.setFilePath((String) paramMap.get("filePath"));
		}

		// 预警情报登入
		if (CollectionUtils.isNotEmpty(userList)) {

			for (String username : userList) {
				warningInfo.setRecUid(ScfUUID.generate());
				warningInfo.setTargetUserId(username);
				warningInfoMapper.insertSelective(warningInfo);
			}
		}

		// 根据查出来的指派人员用户名插入预警
		if (paramMap.containsKey("userName") & paramMap.get("userName") != null) {

			warningInfo.setRecUid(ScfUUID.generate());
			warningInfo.setTargetUserId((String) paramMap.get("userName"));
			warningInfoMapper.insertSelective(warningInfo);
		}

	}

	@Override
	public BaseRespBean getTemplateList(CommonInfoReqBean reqBean) {
		ListRespBean respBean = new ListRespBean();

		CommitmentLetterInfoExample example = new CommitmentLetterInfoExample();
		com.ut.scf.pojo.auto.CommitmentLetterInfoExample.Criteria criteria = example.createCriteria();
		criteria.andTemplateTypeEqualTo(reqBean.getTemplateType());
		respBean.setDataList(letterInfoMapper.selectByExample(example));

		return respBean;
	}

	@Override
	public BaseRespBean getTemplateUrl(CommonInfoReqBean reqBean) {
		StringRespBean respBean = new StringRespBean();
		respBean.setStr((letterInfoMapper.selectByPrimaryKey(reqBean.getTemplateKey())).getTemplatePath());

		return respBean;
	}
}
