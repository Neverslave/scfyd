package com.ut.scf.core.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Map;

import com.ut.scf.core.dict.ScfConsts;

/**
 * 身份证工具类
 * 
 * @author liwd
 *
 */
public class IdCardUtil {

	// 从身份证号码中解析 性别 出生年月 年龄
	public static Map<String, String> idcardInfoExtractor(String idcard) {
		Map<String, String> map = new HashMap<String, String>();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		try {
			// 获取性别
			String id17 = idcard.substring(16, 17);
			if (Integer.parseInt(id17) % 2 != 0) {
				map.put("gender", "男");
			} else {
				map.put("gender", "女");
			}
			// 获取出生日期
			String birthday = idcard.substring(6, 14);
			Date birthdate = format.parse(birthday);
			map.put("birthday",
					ScfDateUtil.format(birthdate, ScfConsts.DATE_FORMAT));
			GregorianCalendar currentDay = new GregorianCalendar();
			currentDay.setTime(birthdate);

			// 获取年龄
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy");
			String year = simpleDateFormat.format(new Date());
			String age = String.valueOf(Integer.parseInt(year)
					- currentDay.get(Calendar.YEAR));
			map.put("age", age);
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
