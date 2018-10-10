package com.ut.scf.dao.pub;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;

import com.ut.scf.core.dict.PageInfoBean;


public interface IUploadFileRelaDao {
	List<Map<String, Object>> selectFileRelaList(Map<String, Object> paramMap,PageInfoBean page);
	
	@Insert("insert into upload_file_rela(file_id, file_url,corp_id,attach_type,attach_size,sys_type,create_time,create_user_id,status,file_name,upload_type) values(#{fileId}, #{fileUrl},#{corpId},#{attachType},#{attachSize},#{sysType},now(),#{createUserId},1,#{fileName},#{uploadType})")
	int insertFileRela(Map<String, Object> paramMap);
	
	@Update("UPDATE upload_file_rela SET status = 0 WHERE corp_id = #{corpId}")
	int deleteFileRela(String corpId);
	
	List<Map<String, Object>> selectInformFileList(Map<String, Object> paramMap,PageInfoBean page);
	
	@Insert("insert into inform_file (file_id,inform_id,file_title,file_type,file_size,file_path)VALUES(#{fileId}, #{informId},#{fileTitle},#{fileType},#{fileSize},#{filePath})")
	int insertInformFile(Map<String, Object> paramMap);
	
	@Update("delete from inform_file where inform_id = #{informId}")
	int deleteInformFile(String informId);
}
