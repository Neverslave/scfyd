package com.ut.scf.web.listener;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import com.ut.scf.core.dict.ScfCacheDict;

public class SessionListener implements HttpSessionAttributeListener{

	@Override
	public void attributeAdded(HttpSessionBindingEvent event) {
		String attrName = event.getName();
		if ("username".equals(attrName)) {// 用户名
			String value = (String) event.getValue();
			HttpSession session = ScfCacheDict.loginUserMap.get(value);
			if (session != null) {
                session.removeAttribute(attrName);
                session.invalidate();
            }
			ScfCacheDict.loginUserMap.put(value, event.getSession());
		}
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent event) {
		String attrName = event.getName();
		if ("username".equals(attrName)) {// 用户名
			ScfCacheDict.loginUserMap.remove((String) event.getValue());
		}
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent event) {
		// TODO Auto-generated method stub
		
	}



}
