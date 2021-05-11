---
date: "2021-05-11"
title: "Linux常用命令"
category: "linux"
tag: "Linux,常用命令"
type: "学习整理"
author: "slsay"
---

## 磁盘利用状况
### 查看当前目录
```sh
df -h
```

### 查看指定目录
```shell script
df -h /usr/
```

### 查看当前目录每个文件夹
```shell script
du --max-depth=1 -h
```

### 查看指定目录每个文件夹
```shell script
du --max-depth=1 -h /usr/
```

### 计算文件夹大小
```shell script
du -sh /usr/
```

## 操作系统
### 查看OS版本
```shell script
cat /etc/issue
```
### 查看Linux内核版本
```shell script
uname -a
cat /proc/version
```

### CPU和内存使用
```shell script
top
```

## 拷贝
### 本地拷贝
```shell script
cp source/a.mp3 dest/

# 递归拷贝（全拷贝）
cp -r source/ dest/
```

### 远程拷贝
```shell script
# 免认证
scp /tmp/test.zip root@192.168.1.1:/opt/test
# 认证
scp -i ./id_rsa /tmp/test.zip root@192.168.1.1:/opt/test
# 反向拷贝
scp root@192.168.1.1:/opt/test/test.zip /tmp

```