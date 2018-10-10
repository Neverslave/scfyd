package com.ut.scf.reqbean.tradfact;

public class Agency {
    /**
     * 发送的对象
     */
    private String toUser;
    /**
     * 流程名称
     */
    private String procdefName;
    private String userName;
    private String taskId;
    private String procInstId;
    private String taskDefKey;
    private String procdefKey;


    public String getToUser() {
        return toUser;
    }

    public void setToUser(String toUser) {
        this.toUser = toUser;
    }

    public String getProcdefName() {
        return procdefName;
    }

    public void setProcdefName(String procdefName) {
        this.procdefName = procdefName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getProcInstId() {
        return procInstId;
    }

    public void setProcInstId(String procInstId) {
        this.procInstId = procInstId;
    }

    public String getTaskDefKey() {
        return taskDefKey;
    }

    public void setTaskDefKey(String taskDefKey) {
        this.taskDefKey = taskDefKey;
    }

    public String getProcdefKey() {
        return procdefKey;
    }

    public void setProcdefKey(String procdefKey) {
        this.procdefKey = procdefKey;
    }
}
