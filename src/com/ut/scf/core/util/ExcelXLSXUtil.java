package com.ut.scf.core.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/*import org.apache.poi.hssf.usermodel.XSSFCell;
import org.apache.poi.hssf.usermodel.XSSFCellStyle;
import org.apache.poi.hssf.usermodel.XSSFFont;
import org.apache.poi.hssf.usermodel.XSSFRow;
import org.apache.poi.hssf.usermodel.XSSFSheet;
import org.apache.poi.hssf.usermodel.XSSFWorkbook;*/
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * excel相关操作类，如导入导出
 * 
 * @author liwd
 *
 */
public class ExcelXLSXUtil {

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

	public static XSSFWorkbook crateBook() {
		XSSFWorkbook XSSFWorkbook = new XSSFWorkbook();
		return XSSFWorkbook;
	}

	public static XSSFSheet crateSheet(XSSFWorkbook XSSFWorkbook) {
		XSSFSheet XSSFSheet = XSSFWorkbook.createSheet("XSSFSheet1");
		XSSFSheet.autoSizeColumn(1, true);
		return XSSFSheet;
	}
	public static XSSFSheet crateSheetByName(XSSFWorkbook XSSFWorkbook,String sheetName) {
		XSSFSheet XSSFSheet = XSSFWorkbook.createSheet(sheetName);
		XSSFSheet.autoSizeColumn(1, true);
		return XSSFSheet;
	}
	public static XSSFSheet writeTitle(String title, List<String> titles, XSSFCellStyle style, XSSFSheet XSSFSheet) {
		int cellCounts = titles.size();
		int index = XSSFSheet.getLastRowNum() + 1;
		XSSFRow row = XSSFSheet.createRow(index);
		XSSFCell cell = row.createCell(0);
		cell.setCellValue(title);
		cell.setCellStyle(style);
		XSSFSheet.addMergedRegion(new CellRangeAddress(index, index, 0, cellCounts - 1));
		XSSFRow rowTitle = XSSFSheet.createRow(index + 1);
		for (int i = 0; i < cellCounts; i++) {
			XSSFCell tempCell = rowTitle.createCell(i);
			tempCell.setCellStyle(style);
			tempCell.setCellValue(titles.get(i));
			XSSFSheet.setColumnWidth(i, titles.get(i).getBytes().length * 2 * 256);
		}
		return XSSFSheet;
	}

	public static void exportToExcel(List<String> fields, List<Map<String, Object>> map, Map<String, String> mergeMap,
			XSSFCellStyle style, XSSFSheet XSSFSheet) {
		int cellCounts = fields.size();
		Map<String, String> mergeFlag = new LinkedHashMap<String, String>();
		Map<String, Integer> mergeFlag2 = new LinkedHashMap<String, Integer>();
		for (int i = 0; i < map.size(); i++) {
			int rowIndex = XSSFSheet.getLastRowNum() + 1;
			Map<String, Object> tempMap = map.get(i);
			XSSFRow rowData = XSSFSheet.createRow(rowIndex);
			for (int j = 0; j < cellCounts; j++) {
				String field = fields.get(j);
				String value = String.valueOf(tempMap.get(field));
				XSSFCell tempCell = rowData.createCell(j);
				tempCell.setCellStyle(style);
				tempCell.setCellValue(value);

				int tempWidth = XSSFSheet.getColumnWidth(j);
				int temp = value.getBytes().length * 2 * 255;
				if (temp > tempWidth) {
					XSSFSheet.setColumnWidth(j, temp);
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
								XSSFSheet.addMergedRegion(new CellRangeAddress(flag2, rowIndex - 1, j, j));
							}
							mergeFlag.put(field, mergeVlue);
							mergeFlag2.put(field, rowIndex);
						} else if (i == map.size() - 1) {
							int flag2 = mergeFlag2.get(field);
							if (flag2 < rowIndex) {
								XSSFSheet.addMergedRegion(new CellRangeAddress(flag2, rowIndex, j, j));
							}

						}
					}

				}

			}
		}
	}

	public static void writeExcel(XSSFWorkbook XSSFWorkbook, String path) throws Exception {
		if (XSSFWorkbook != null) {
			FileOutputStream fileOutputStream = new FileOutputStream(path);
			XSSFWorkbook.write(fileOutputStream);
			fileOutputStream.close();
		}
	}

	public static XSSFFont getFont(XSSFWorkbook XSSFWorkbook) {
		XSSFFont font = XSSFWorkbook.createFont();
		font.setFontHeightInPoints((short) 10); // 字体高度
		font.setFontName("宋体"); // 字体
		return font;

	}

	@SuppressWarnings("deprecation")
	public static XSSFCellStyle setCell(XSSFWorkbook XSSFWorkbook, XSSFFont font) {
		XSSFCellStyle cellStyle = XSSFWorkbook.createCellStyle();
		cellStyle.setFont(font);
		cellStyle.setAlignment(XSSFCellStyle.ALIGN_CENTER); // 水平布局：居中
		cellStyle.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);// 垂直居中
		cellStyle.setWrapText(true);
		cellStyle.setBorderBottom(BorderStyle.THIN);
		cellStyle.setBorderLeft(BorderStyle.THIN);
		cellStyle.setBorderTop(BorderStyle.THIN);
		cellStyle.setBorderRight(BorderStyle.THIN);
		return cellStyle;

	}

}
