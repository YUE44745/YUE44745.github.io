---
layout: single

title:  "一种测量ADC的动态特性的方法"

# categories: "Life&Emotions"
# categories: "Circuit-Comprehension"
# categories: "Tech-"

categories: "Tech-IC"

header:
    # image: /assets/images/IMG_20240312_174914.jpg
    # caption: ""
    # teaser: "/assets/images/teaser-beauty.png"
---

计算ADC的ENOB，SNR，SNDR，SNFR。并且画出其频谱。

Reference: 【ADC动态性能分析方法_Matlab】 
https://www.bilibili.com/video/BV1Yv421i7ku/?share_source=copy_web&vd_source=aa4641ffa1428b9b417d1c648edda95b

## 导出virtuoso中各位的模拟电压并转换为二进制编码和十进制编码
![alt text](/assets/images/2024-07-03-ADC-dynamic-charateristics/image.png)
我选择导出的CSV格式，但是以文本形式打开（gedit .csv），之后复制到我的工作区内。删去标签头，可以看到剩下的格式每一行是一个时间的数据，分别以时间加电压值，中间通过逗号分隔开。于是我写了以下python脚本进行文本数据处理。
```python
def analog2digital(input_file_path, output_file_path, logic_threshold):
    # 打开输入文件和输出文件
    with open(input_file_path, 'r') as input_file, open(output_file_path, 'w') as output_file:
        # 循环读取输入文件的每一行
        for line in input_file:
            # 使用逗号分隔每一行的数据
            data = line.strip().split(',')
            
            # 检查是否有足够的数据点
            if len(data) < 16:
                print(f"Warning: Line has less than 16 entries, skipping.")
                continue
            
            # 初始化结果字符串
            result = ""
            
            # 对于每一个需要检查的位置
            for i in [1, 3, 5, 7, 9, 11, 13, 15]:
                # 将对应的值转换为浮点数并比较
                value = float(data[i])
                if value > logic_threshold:
                    result += "1"
                else:
                    result += "0"
            
            # 写入结果到输出文件
            output_file.write(result + '\n')

# 调用函数，传入输入文件路径和输出文件路径
input_file_path = 'analog8bit.txt'  # 替换为你的输入文件路径
output_file_path = 'digitalBinary.txt'  # 替换为你想要的输出文件路径
logic_threshold = 1.65 
analog2digital(input_file_path, output_file_path, logic_threshold)
```

就可以看到生成以下文件
![alt text](/assets/images/2024-07-03-ADC-dynamic-charateristics/image-1.png)

再运行以下脚本
```python
def binary_to_decimal(input_file_path, output_file_path):
    # 打开输入文件和输出文件
    with open(input_file_path, 'r') as input_file, open(output_file_path, 'w') as output_file:
        # 循环读取输入文件的每一行
        for line in input_file:
            # 去除行尾的换行符等空白字符
            binary_str = line.strip()
            
            # 将二进制字符串转换为十进制数
            decimal_value = int(binary_str, 2)
            
            # 将十进制数值写入输出文件
            output_file.write(str(decimal_value) + '\n')

# 调用函数，传入输入文件路径和输出文件路径
input_file_path = 'digitalBinary.txt'  # 替换为你的输入文件路径，其中每一行包含一个二进制数
output_file_path = 'digitalDecimal.txt'  # 替换为你想要的输出文件路径
binary_to_decimal(input_file_path, output_file_path)
```
得到对应的10进制编码
![alt text](/assets/images/2024-07-03-ADC-dynamic-charateristics/image-2.png)

这样就准备完了进行ADC动态特性分析所需要的数据。

## ADC动态特性分析
运行以下matlab代码
```matlab
%% To analyze the dynamic charateristics of ADC
% Author: UpstreamWind

%%%%%% Code Starts Below %%%%%%
close all; clear; clc;
%% Define parameter
num_sample = 1024;
f_sample = 1e6;
sig_period = 30;
f_sig = sig_period * f_sample / num_sample; % ensure coherent sampling, in my case is 29.296875 KHz
num_nquist = num_sample/2;
f_nquist = f_sample/2;
%% Import the data and invert to spectrum
% Attentino: just need the coding data in decimal.
coding_decimal = importdata('digitalDecimal.txt');
% coding_decimal = importdata('digitalDecimalIDL.txt');
data = coding_decimal .* 1.2 ./ 255;      % As my ADC resolution is 8-bit and sample range is 1.1~2.3V
save('data.mat', 'data');
fft_data1 = fft(data(1:num_sample), num_sample);
fft_data = fft_data1 .* conj(fft_data1) / num_sample;
fft_data = fft_data / max(fft_data);
Fr =  f_sample * (1:num_nquist) / num_sample;
PYY = 10 * log10(fft_data);
fft_data(1) = 0;
%% Plot half spectrum (maybe)
figure(1);
plot(Fr/1e3, PYY(1:num_nquist));
xlabel('Frequency(KHz)')
ylabel('Amplitude(dB)')
%% FH
num_harmonic = 10;
for i = 1:1:num_harmonic
    f_N_harmonic = f_sig * i;
    K(i) = floor((f_N_harmonic * (num_sample / f_sample)) + 0.5);   % number of harmonic period
    if(f_N_harmonic < f_nquist)
        Kp(i) = K(i);
    else
        tmp1 = K(i) - fix(K(i)/num_sample) * num_sample;
        if(tmp1 > num_nquist)
            Kp(i) = num_sample - tmp1;
        else
            Kp(i) = tmp1;
        end
    end
end
for i=1:1:10
    SubFL(i) = Kp(i) + 1;
end
%% SNR,SNDR,SNFR,ENOB
FL = SubFL;
Sum_Har = 0;
noise = 0;
FH = FL;
Har_data = fft_data;
for I = 1:1:num_harmonic
    Har_L = FH(I);
    Sum_Har = Sum_Har + Har_data(Har_L);    % Sum_Har
    Har_data(Har_L) = 0;
end
for I = 1:1:num_nquist
    noise = noise + Har_data(I);            % noise
end
sig = fft_data(FH(1));                      % signal
SNR = 10 * log10(sig / noise);              % SNR
THD = 10 * log10((Sum_Har - sig) / sig);    % THD
SNDR_data = fft_data;
SNDR_data(FH(1)) = 0;
noiseT = sum(SNDR_data(1:num_nquist));
SNDR = 10 * log10(sig / noiseT);                            % SNDR
SFDR = 10 * log10(sig / max(SNDR_data(1:num_nquist - 1)));   % SFDR
ENOB = (SNDR - 1.76) / 6.02;                                % ENOB
%% Annotation
ann = annotation('textbox', [0.6, 0.7, 0.2, 0.2]);
set(ann, 'FitBoxToText', 'on', ...
    'string', {[num2str(num_sample), ' point-FFT-Plot'], ...
    ['f_s_a_m_p_l_e=', num2str(f_sample/1e6), 'MHz'], ...
    ['f_s_i_g=', num2str(f_sig/1e3), 'KHz'], ...
    ['SNDR=', num2str(SNDR), 'dB'], ...
    ['SFDR=', num2str(SFDR), 'dB'], ...
    ['ENOB=', num2str(ENOB), 'bit']})
```

![alt text](/assets/images/2024-07-03-ADC-dynamic-charateristics/image-3.png)
最后得到频谱图和各个指标值。

## 可能出现问题及不足之处
首先，我的信号系统学的不是很好。再者，我学了的部分好像也没有教过上诉分析。

所以我并没有理解上面matlab代码在信号上的意义。但是依靠reference中提到的视频中的代码整理。

之后我生成了一个理想的8bit ADC输出序列进入该脚本，但是输出结果显示ENOB大约为7.8bit。这让我感到疑惑。

另附上生成理想ADC采样编码的脚本
```matlab
%% To generate a ideal output of a 8 bit ADC
% Author: UpstreamWind
close all; clear; clc;
num_sample = 1024;
f_sample = 1;   % MHz
sig_period = 30;
f_sig = sig_period * f_sample / num_sample; % ensure coherent sampling, in my case is 29.296875 KHz
LSB = 1.2/255;
t = 1:1:1024;
value = 0.6 * (sin(2*pi*f_sig*t) + 1);
code = fix(value / LSB);
fileID = fopen('digitalDecimalIDL.txt','w');
for i = 1:length(code)
    fprintf(fileID,'%d\n', code(i)); % 使用%d指定整数类型，\n表示换行
end
fclose(fileID);
```

如果读者愿意不吝赐教，非常欢迎点击About中的链接向我发送邮件。