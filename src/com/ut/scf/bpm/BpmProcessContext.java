package com.ut.scf.bpm;

import org.omg.CORBA.StringHolder;

public class BpmProcessContext<T> {

    private String formDataJson;

    private String userName;

    private boolean isProcessEnd;

    private String processId;

    private  T t;

    public String getFormDataJson() {
        return formDataJson;
    }

    public void setFormDataJson(String formDataJson) {
        this.formDataJson = formDataJson;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId;
    }

    public boolean isProcessEnd() {
        return isProcessEnd;
    }

    public void setProcessEnd(boolean processEnd) {
        isProcessEnd = processEnd;
    }

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }
}
