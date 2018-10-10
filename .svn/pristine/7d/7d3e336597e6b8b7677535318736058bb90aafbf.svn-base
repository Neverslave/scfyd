package com.ut.scf.core.util;
  
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Vector;


import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

 
  
public class FtpUtil {  
  
   // private final static Log logger = LogFactory.getLog(FtpUtil.class);  
  
      
    /* 
     * 从SFTP服务器下载文件 
     *  
     * @param ftpHost SFTP IP地址 
     *  
     * @param ftpUserName SFTP 用户名 
     *  
     * @param ftpPassword SFTP用户名密码 
     *  
     * @param ftpPort SFTP端口 
     *  
     * @param ftpPath SFTP服务器中文件所在路径 格式： ftptest/aa 
     *  
     * @param localPath 下载到本地的位置 格式：H:/download 
     *  
     * @param fileName 文件名称 
     */  
    public static void downloadSftpFile(String ftpHost, String ftpUserName,  
            String ftpPassword, String ftpPort, String ftpPath, String localPath,  
            List<String> list) throws JSchException {  
        Session session = null;  
        Channel channel = null;  
  
        JSch jsch = new JSch();  
        session = jsch.getSession(ftpUserName, ftpHost, Integer.valueOf(ftpPort));  
        session.setPassword(ftpPassword);  
        session.setTimeout(100000);  
        Properties config = new Properties();  
        config.put("StrictHostKeyChecking", "no");  
        session.setConfig(config);  
        session.connect();  
  
        channel = session.openChannel("sftp");  
        channel.connect();  
        ChannelSftp chSftp = (ChannelSftp) channel;  
  
      
        try { 
        	for(int i=0;i<list.size();i++)
        	{
        		 String ftpFilePath = ftpPath + "/" + list.get(i);  
            	 
                 chSftp.get(ftpFilePath, localPath);  
        	}
        	 
        } catch (Exception e) {  
            e.printStackTrace();  
     
        } finally {  
            chSftp.quit();  
            channel.disconnect();  
            session.disconnect();  
        }  
  
    }  
    
    public static List<String> listSftpFile(String ftpHost, String ftpUserName,  
 String ftpPassword, String ftpPort,
			String ftpPath) throws JSchException {

		Session session = null;
		Channel channel = null;
		List<String> chSftplist = new ArrayList<>();
		JSch jsch = new JSch();
		session = jsch.getSession(ftpUserName, ftpHost, Integer.valueOf(ftpPort));
		session.setPassword(ftpPassword);
		session.setTimeout(100000);
		Properties config = new Properties();
		config.put("StrictHostKeyChecking", "no");
		session.setConfig(config);
		session.connect();

		channel = session.openChannel("sftp");
		channel.connect();
		ChannelSftp chSftp = (ChannelSftp) channel;

		try {

			Vector<LsEntry> sftpFile = chSftp.ls(ftpPath);
			LsEntry lsEntry = null;
			String fileName = null;

			java.util.Iterator<LsEntry> sftpFileNames = sftpFile.iterator();

			// for(int i=0;i<sftpFileNames)
			while (sftpFileNames.hasNext()) {

				lsEntry = (LsEntry) sftpFileNames.next();
				fileName = lsEntry.getFilename();
				if (fileName.contains(".zip")) {
					chSftplist.add(fileName);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();

		} finally {

			chSftp.quit();
			channel.disconnect();
			session.disconnect();
		}
		  return chSftplist;
	}  
  
}  