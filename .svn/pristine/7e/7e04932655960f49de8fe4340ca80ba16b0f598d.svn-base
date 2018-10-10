package com.ut.scf.core.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * excel相关操作类，如导入导出
 * 
 * @author liwd
 *
 */
public class ExcelUtil2 {

	/**
	 * 对list数据源将其里面的数据导入到excel表单
	 * 
	 * @param title
	 *            标题
	 * 
	 * @param map
	 *            要导入excel的数据
	 * 
	 * @param titles
	 *            导出到excel文件里的表头名
	 * 
	 * @param fields
	 *            导出到excel文件里的表头名对应顺序的取数据源中Map key值
	 * 
	 * @param mergeMap
	 *            key 需要合并的列 value 合并依据
	 * 
	 * @return
	 * @throws IOException
	 */

	public static HSSFWorkbook crateBook() {
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook();
		return hssfWorkbook;
	}

	public static HSSFSheet crateSheet(HSSFWorkbook hssfWorkbook) {
		HSSFSheet hssfSheet = hssfWorkbook.createSheet("hssfSheet1");
		hssfSheet.autoSizeColumn(1, true);
		return hssfSheet;
	}
	public static HSSFSheet crateSheetByName(HSSFWorkbook hssfWorkbook,String sheetName) {
		HSSFSheet hssfSheet = hssfWorkbook.createSheet(sheetName);
		hssfSheet.autoSizeColumn(1, true);
		return hssfSheet;
	}
	public static HSSFSheet writeTitle(String title, List<String> titles, HSSFCellStyle style, HSSFSheet hssfSheet) {
		int cellCounts = titles.size();
		int index = hssfSheet.getLastRowNum() + 1;
		HSSFRow row = hssfSheet.createRow(index);
		HSSFCell cell = row.createCell(0);
		cell.setCellValue(title);
		cell.setCellStyle(style);
		hssfSheet.addMergedRegion(new CellRangeAddress(index, index, 0, cellCounts - 1));
		HSSFRow rowTitle = hssfSheet.createRow(index + 1);
		for (int i = 0; i < cellCounts; i++) {
			HSSFCell tempCell = rowTitle.createCell(i);
			tempCell.setCellStyle(style);
			tempCell.setCellValue(titles.get(i));
			hssfSheet.setColumnWidth(i, titles.get(i).getBytes().length * 2 * 256);
		}
		return hssfSheet;
	}

	public static void exportToExcel(List<String> fields, List<Map<String, Object>> map, Map<String, String> mergeMap,
			HSSFCellStyle style, HSSFSheet hssfSheet) {
		int cellCounts = fields.size();
		Map<String, String> mergeFlag = new LinkedHashMap<String, String>();
		Map<String, Integer> mergeFlag2 = new LinkedHashMap<String, Integer>();
		for (int i = 0; i < map.size(); i++) {
			int rowIndex = hssfSheet.getLastRowNum() + 1;
			Map<String, Object> tempMap = map.get(i);
			HSSFRow rowData = hssfSheet.createRow(rowIndex);
			for (int j = 0; j < cellCounts; j++) {
				String field = fields.get(j);
				String value = String.valueOf(tempMap.get(field));
				HSSFCell tempCell = rowData.createCell(j);
				tempCell.setCellStyle(style);
				tempCell.setCellValue(value);

				int tempWidth = hssfSheet.getColumnWidth(j);
				int temp = value.getBytes().length * 2 * 255;
				if (temp > tempWidth) {
					hssfSheet.setColumnWidth(j, temp);
				}
				if (mergeMap != null && mergeMap.containsKey(field)) {
					String mergeBy = mergeMap.get(field);
					String mergeVlue = String.valueOf(tempMap.get(mergeBy));
					if (i == 0) {
						mergeFlag.put(field, mergeVlue);
						mergeFlag2.put(field, rowIndex);
					} else {
						String flag = mergeFlag.get(field);
						if (!flag.equals(mergeVlue)) {
							int flag2 = mergeFlag2.get(field);
							if (flag2 < rowIndex - 1) {
								hssfSheet.addMergedRegion(new CellRangeAddress(flag2, rowIndex - 1, j, j));
							}
							mergeFlag.put(field, mergeVlue);
							mergeFlag2.put(field, rowIndex);
						} else if (i == map.size() - 1) {
							int flag2 = mergeFlag2.get(field);
							if (flag2 < rowIndex) {
								hssfSheet.addMergedRegion(new CellRangeAddress(flag2, rowIndex, j, j));
							}

						}
					}

				}

			}
		}
	}

	public static void writeExcel(HSSFWorkbook hssfWorkbook, String path) throws Exception {
		if (hssfWorkbook != null) {
			FileOutputStream fileOutputStream = new FileOutputStream(path);
			hssfWorkbook.write(fileOutputStream);
			fileOutputStream.close();
		}
	}

	public static HSSFFont getFont(HSSFWorkbook hssfWorkbook) {
		HSSFFont font = hssfWorkbook.createFont();
		font.setFontHeightInPoints((short) 14); // 字体高度
		font.setFontName("宋体"); // 字体
		return font;

	}

	@SuppressWarnings("deprecation")
	public static HSSFCellStyle setCell(HSSFWorkbook hssfWorkbook, HSSFFont font) {
		HSSFCellStyle cellStyle = hssfWorkbook.createCellStyle();
		cellStyle.setFont(font);
		cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 水平布局：居中
		cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直居中
		cellStyle.setWrapText(true);
		cellStyle.setBorderBottom(BorderStyle.THIN);
		cellStyle.setBorderLeft(BorderStyle.THIN);
		cellStyle.setBorderTop(BorderStyle.THIN);
		cellStyle.setBorderRight(BorderStyle.THIN);
		return cellStyle;

	}

}
